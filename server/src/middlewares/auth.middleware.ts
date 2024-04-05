import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model';
import { AuthenticatedRequest } from '../types';
import axios from 'axios';
import UnauthorizedError from '../errors/UnauthorizedError';
import OauthUser from '../models/OauthUser.model';
import NotFoundError from '../errors/NotFoundError';
import OauthUsernameError from '../errors/OauthUsernameError';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token ? JSON.parse(req.cookies.token) : null;

  try {
    if (!token) {
      throw new UnauthorizedError('Authentication required!');
    }

    if (token.platform === 'GitHub') {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      if (!data?.id) {
        throw new UnauthorizedError('Authentication required!');
      }

      const oauthUser = await OauthUser.findOne({
        userId: data.id,
        platform: 'GitHub',
      });

      if (!oauthUser) {
        throw new NotFoundError('User not found!');
      }

      if (!oauthUser.username) {
        throw new OauthUsernameError('GitHub');
      }

      (req as AuthenticatedRequest).user = {
        username: oauthUser.username,
        platform: 'GitHub',
      };
      next();
    } else {
      const jwtSecret = process.env.JWT_SECRET!;
      const decodedToken = jwt.verify(token.value, jwtSecret) as JwtPayload;
      const user = (await User.findById(decodedToken.userId))!;

      (req as AuthenticatedRequest).user = { username: user.username };
      next();
    }
  } catch (err) {
    next(err);
  }
}
