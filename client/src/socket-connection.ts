import { io } from 'socket.io-client';

const socket = io(
  import.meta.env.PROD ? import.meta.env.WEBSOCKET_URL : 'http://localhost:8080'
);

export default socket;
