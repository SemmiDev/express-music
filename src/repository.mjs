import { v4 as uuidv4 } from 'uuid';

/* 
    {
        id: '1',
        title: 'Song 1',
        artist: [
            'Artist 1',
            'Artist 2',
        ],
        url: 'URL Spotify Song'
        totalPlay: 0,
        createdAt: 2023-12-12T00:00:00.000Z,
        updatedAt: 2023-12-12T00:00:00.000Z,
    }
*/

const playlist = [];

export const createSong = ({ id, title, artist, url, totalPlay, createdAt, updatedAt }) => {
  const song = {
    id,
    title,
    artist,
    url,
    totalPlay,
    createdAt,
    updatedAt,
  };

  playlist.push(song);
  return song;
};

export const getSongById = (id) => playlist.find((song) => song.id === id);

export const getSong = (sortBy) => {
  let sortedPlaylist = [...playlist];

  switch (sortBy) {
    case 'createdAt':
      sortedPlaylist.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case 'updatedAt':
      sortedPlaylist.sort((a, b) => a.updatedAt - b.updatedAt);
      break;
    case 'createdAtDesc':
      sortedPlaylist.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'updatedAtDesc':
      sortedPlaylist.sort((a, b) => b.updatedAt - a.updatedAt);
      break;
    case 'totalPlay':
      sortedPlaylist.sort((a, b) => b.totalPlay - a.totalPlay);
      break;
    default:
      sortedPlaylist.sort((a, b) => a.createdAt - b.createdAt);
  }

  return sortedPlaylist;
};

export const playSong = (id) => {
  const song = getSongById(id);
  if (song) {
    song.totalPlay = song.totalPlay + 1;
  }

  playlist[playlist.findIndex((song) => song.id === id)] = song;

  return song.url
};

export const updateSong = (id, updatedSong) => {
  const index = playlist.findIndex((song) => song.id === id);
  if (index !== -1) {
    playlist[index] = { ...playlist[index], ...updatedSong };
  }
};

export const deleteSong = (id) => {
  const index = playlist.findIndex((song) => song.id === id);
  if (index !== -1) {
    playlist.splice(index, 1);
  }
};

export const seedPlaylist = () => {
  const song = {
    id: uuidv4(),
    title: `Naik Kereta Api`,
    artist: [
      `Agnes Mo`
    ],
    url: 'https://open.spotify.com/track/59B6XA5N4lOXPP5a0TxRSZ',
    totalPlay: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  createSong(song);
  console.log(`Seeded ${song.title} song 👌`);
};

export const songRepository = {
  createSong,
  getSongById,
  getSong,
  playSong,
  updateSong,
  deleteSong,
}