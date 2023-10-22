import axios from 'axios';
import { Server } from 'socket.io';

export function generateCode(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let output = '';
  for (let i = 0; i < length; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    output += randomChar;
  }
  return output;
}

export async function fetchQuote() {
  const res = await axios
    .get(`https://api.quotable.io/random?minLength=75`)
    .then((res: any) => {
      return res.data.content.replace(/—/g, '-').replace(/…/g, '...');
    });

  return res;
}

export function startCountdown(roomCode: string, io: Server) {
  const startsAt = new Date().getTime() + 5000;
  io.sockets.to(roomCode).emit('typingStartsAt', startsAt);

  const interval = setInterval(() => {
    if (new Date().getTime() > startsAt) {
      io.sockets.to(roomCode).emit('typingStarted');
      clearInterval(interval);
    }
  }, 500);
}
