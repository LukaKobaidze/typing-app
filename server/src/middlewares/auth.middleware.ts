import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model';
import { CustomRequest } from '../types';

export default async function auth(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  console.log('MIDDLEWARE: ', token);

  if (!token) {
    return res.status(401).json({ message: 'Authentication required!' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET!;
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token!' });
  }
}
