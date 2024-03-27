import { io } from 'socket.io-client';
import { data } from '@/data';

const socket = io(data.apiUrl);

export default socket;
