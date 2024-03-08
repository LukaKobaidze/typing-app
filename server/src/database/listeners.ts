import mongoose from 'mongoose';

export function databaseListeners() {
  mongoose.connection.once('open', () => {
    console.log('Database connected!');
  });

  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
}
