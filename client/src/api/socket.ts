import { io } from 'socket.io-client';
import { data } from '@/data';

const socket = io('/1v1');

export default socket;
