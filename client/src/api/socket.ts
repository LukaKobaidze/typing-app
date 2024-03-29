import { io } from 'socket.io-client';
import { data } from '@/data';

const socket = io(data.apiUrl + '/1v1');

export default socket;
