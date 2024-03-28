import axios from 'axios';
import { QuoteLengthType } from './types';
import { Namespace, Server } from 'socket.io';

export function generateCode(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let output = '';
  for (let i = 0; i < length; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    output += randomChar;
  }
  return output;
}

export async function fetchQuote(length: QuoteLengthType) {
  const res = await axios
    .get(
      `https://api.quotable.io/random${
        length === 'short'
          ? '?maxLength=100'
          : length === 'medium'
          ? '?minLength=101&maxLength=250'
          : length === 'long'
          ? '?minLength=251'
          : ''
      }`
    )
    .then((res: any) => {
      return res.data.content.replace(/—/g, '-').replace(/…/g, '...');
    });

  return res;
}

export function startCountdown(roomCode: string, io1v1: Namespace) {
  const startsIn = 5000;

  const startsAt = new Date().getTime() + startsIn;

  io1v1.to(roomCode).emit('typing-starts-in', startsIn);
  const interval = setInterval(() => {
    const remaining = startsAt - new Date().getTime();

    if (remaining > 0) {
      io1v1.to(roomCode).emit('typing-starts-in', remaining);
    } else {
      io1v1.to(roomCode).emit('typing-started');
      clearInterval(interval);
    }
  }, 1000);
}
