import axios from 'axios';
import { SocketEvent } from 'shared/types';
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
  const startsIn = 5000;

  const startsAt = new Date().getTime() + startsIn;

  io.sockets.to(roomCode).emit(SocketEvent.TypingStartsIn, startsIn);
  const interval = setInterval(() => {
    const remaining = startsAt - new Date().getTime();

    if (remaining > 0) {
      io.sockets.to(roomCode).emit(SocketEvent.TypingStartsIn, remaining);
    } else {
      io.sockets.to(roomCode).emit(SocketEvent.TypingStarted);
      clearInterval(interval);
    }
  }, 1000);
}
