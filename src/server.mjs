import express from 'express';
import bodyParser from 'body-parser';
import { songService } from './service.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.json());

app.post('/songs', async (req, res) => {
    try {
        const { title, artist, url } = req.body;

        const arrayArtist = artist.split(',').map((artist) => artist.trim());

        const song = songService.createSong({ title, artist: arrayArtist, url });

        res.status(201).json(wrapResponse(song));
    } catch (error) {
        res.status(400).json(buildErrorResponse(400, error.message));
    }
});

app.get('/songs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const song = songService.getSongById(id);

        res.json(wrapResponse(song));
    } catch (error) {
        res.status(404).json(buildErrorResponse(404, error.message));
    }
});

app.get('/songs', async (req, res) => {
    try {
        const { sortBy } = req.query;

        const songs = songService.getSong(sortBy);

        res.json(wrapResponse(songs));
    } catch (error) {
        res.status(500).json(buildErrorResponse(500, 'Internal Server Error'));
    }
});

app.put('/songs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (updatedData.artist) {
            updatedData.artist = updatedData.artist.split(',').map((artist) => artist.trim());
        }

        const updatedSong = songService.updateSong(id, updatedData);

        res.json(wrapResponse(updatedSong));
    } catch (error) {
        res.status(404).json(buildErrorResponse(404, error.message));
    }
});

app.delete('/songs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        songService.deleteSong(id);

        res.sendStatus(204);
    } catch (error) {
        res.status(404).json(buildErrorResponse(404, error.message));
    }
});

app.get('/songs/:id/play', async (req, res) => {
    try {
        const { id } = req.params;

        const songUrl = songService.playSong(id);

        res.json({ url: songUrl });
    } catch (error) {
        res.status(404).json(buildErrorResponse(404, error.message));
    }
});


export const runServer = (port) => {
    port = port ?? 3000;

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

const buildErrorResponse = (statusCode, message) => ({
    error: {
        statusCode,
        message,
    },
});

const wrapResponse = (data) => ({
    data,
});