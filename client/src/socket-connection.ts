import { io } from 'socket.io-client';

const socket = io('https://typing-app.fly.de');

export default socket;
