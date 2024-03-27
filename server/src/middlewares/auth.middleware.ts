import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model';
import { AuthenticatedRequest } from '../types';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required!' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET!;
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = (await User.findById(decodedToken.userId))!;

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token!' });
  }
}
