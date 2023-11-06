import { io } from 'socket.io-client';

const socket = io(
  import.meta.env.PROD ? 'https://typing-app.fly.dev' : 'http://localhost:8080'
);

export default socket;
