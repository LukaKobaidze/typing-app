import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

export async function databaseConnect() {
  if (MONGODB_CONNECTION) {
    await mongoose.connect(MONGODB_CONNECTION);
  }
}

export async function databaseDisconnect() {
  await mongoose.disconnect();
}
