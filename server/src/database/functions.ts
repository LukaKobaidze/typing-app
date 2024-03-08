import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

export async function databaseConnect() {
  if (!MONGODB_CONNECTION) {
    throw new Error(
      "Couldn't connect to the database. `MONGODB_CONNECTION` is undefined"
    );
  }

  await mongoose.connect(MONGODB_CONNECTION);
}

export async function databaseDisconnect() {
  await mongoose.disconnect();
}
