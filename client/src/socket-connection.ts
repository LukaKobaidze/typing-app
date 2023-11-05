import { io } from 'socket.io-client';

const socket = io(
  process.env.NODE_ENV === 'production'
    ? process.env.WEBSOCKET_URL ||
        (() => {
          console.error("Environment variable `WEBSOCKET_URL` wasn't provided");
          return 'http://localhost:8080';
        })()
    : 'http://localhost:8080'
);

export default socket;
