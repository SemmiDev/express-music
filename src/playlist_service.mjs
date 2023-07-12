import { songRepository } from "./playlist_repository.mjs";
import { v4 as uuidv4 } from "uuid";

const validateSongData = (title, artist, url) => {
    if (!title || !artist || !url) {
        throw new Error("Title, artist, and URL are required");
    }
};

const createSong = ({ title, artist, url }) => {
    validateSongData(title, artist, url);

    const id = uuidv4();
    const totalPlay = 0;
    const createdAt = new Date();
    const updatedAt = new Date();

    const song = songRepository.createSong({
        id,
        title,
        artist,
        url,
        totalPlay,
        createdAt,
        updatedAt,
    });

    return song;
};

const getSongById = (id) => {
    const song = songRepository.getSongById(id);
    if (!song) {
        throw new Error("Song not found");
    }
    return song;
};

const getSong = (sortBy) => {
    const songs = songRepository.getSong(sortBy);
    return songs;
};

const playSong = (id) => {
    const song = getSongById(id);
    songRepository.playSong(id);
    return song.url;
};

const updateSong = (id, updatedData) => {
    const song = getSongById(id);

    updatedData.updatedAt = new Date()
    const updatedSong = { ...song, ...updatedData };
    songRepository.updateSong(id, updatedSong);

    return updatedSong;
};

const deleteSong = (id) => {
    songRepository.deleteSong(id);
};

export const songService = {
    createSong,
    getSongById,
    getSong,
    playSong,
    updateSong,
    deleteSong,
};
