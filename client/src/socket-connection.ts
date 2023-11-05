import { io } from 'socket.io-client';

const socket = io(
  process.env.NODE_ENV === 'production'
    ? 'https://typing-app.fly.dev'
    : 'http://localhost:8080'
);

export default socket;
