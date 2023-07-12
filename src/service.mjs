import { songRepository } from './repository.mjs';
import { v4 as uuidv4 } from 'uuid';

const validateSongData = (title, artist, url) => {
    if (!title || !artist || !url) {
        throw new Error('Title, artist, and URL are required');
    }
};

const createSong = ({ title, artist, url }) => {
    validateSongData(title, artist, url);

    if (typeof artist === 'string') {
        artist = [artist];
    }

    const id = uuidv4();
    const totalPlay = 0;
    const createdAt = new Date();
    const updatedAt = new Date();

    const song = songRepository.createSong({ id, title, artist, url, totalPlay, createdAt, updatedAt });
    return song;
};

const getSongById = (id) => {
    const song = songRepository.getSongById(id);
    if (!song) {
        throw new Error('Song not found');
    }
    return song;
};

const getSong = (sortBy) => {
    const songs = songRepository.getSong(sortBy);
    return songs;
};

const playSong = (id) => {
    try {
        const song = getSongById(id);
        songRepository.playSong(id);
        return song.url;
    } catch (error) {
        throw new Error('Song not found');
    }
};

const updateSong = (id, updatedData) => {
    try {
        const song = getSongById(id);

        // make sure that artist is an array
        if (updatedData.artist && typeof updatedData.artist === 'string') {
            updatedData.artist = [updatedData.artist];
        }

        const updatedSong = { ...song, ...updatedData };
        songRepository.updateSong(id, updatedSong);
        return updatedSong;
    } catch (error) {
        throw new Error('Song not found');
    }
};

const deleteSong = (id) => {
    try {
        const song = getSongById(id);
        songRepository.deleteSong(id);
    } catch (error) {
        throw new Error('Song not found');
    }
};

export const songService = {
    createSong,
    getSongById,
    getSong,
    playSong,
    updateSong,
    deleteSong,
};
