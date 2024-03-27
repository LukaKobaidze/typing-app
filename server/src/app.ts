import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth/auth.router';
import profileRouter from './routes/profile/profile.router';
import typingRouter from './routes/typing/typing.router';
import error from './middlewares/error.middleware';
import NotFoundError from './errors/NotFoundError';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/typing', typingRouter);

app.all('*', (req, res, next) => {
  next(new NotFoundError(`Invalid path: ${req.originalUrl}`));
});

app.use(error);

export default app;
