import { seedPlaylist } from './src/playlist_repository.mjs';
import { runServer } from './src/server.mjs';

seedPlaylist();
runServer(3000);
