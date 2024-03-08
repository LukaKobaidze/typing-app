import express, { ErrorRequestHandler } from 'express';
import authRouter from './routes/auth/auth.router';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import profileRouter from './routes/profile/profile.router';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    res.status(403).json({
      error: true,
      message: `${field || ''} already exists!`,
      field: field,
    });
  } else {
    console.log(err);
    res.status(err.status).send('Something broke!');
  }
};

app.use(errorHandler);

export default app;
