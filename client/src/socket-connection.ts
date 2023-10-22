import { io } from 'socket.io-client';

const socket = io(process.env.API_URL || 'http://localhost:8080');

export default socket;
