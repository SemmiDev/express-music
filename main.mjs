import { seedPlaylist } from './src/repository.mjs';
import { runServer } from './src/server.mjs';

seedPlaylist();
runServer(3000);
