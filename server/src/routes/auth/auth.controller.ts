import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserProperties } from '../../models/User.model';
import Profile from '../../models/Profile.model';
import { AuthenticatedRequest } from '../../types';
import NotFoundError from '../../errors/NotFoundError';
import ValidationError from '../../errors/ValidationError';

function validatePassword(password: string) {}

export async function httpCreateAccount(
  req: Request<any, Response, UserProperties>,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;

  try {
    const jwtSecret = process.env.JWT_SECRET!;
    const user = new User({ username, email, password });
    await user.save();

    const profile = new Profile({ _id: user._id });
    await profile.save();

    const token = jwt.sign({ userId: user._id }, jwtSecret);

    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({ username });
  } catch (err: any) {
    next(err);
  }
}

export async function httpLogin(
  req: Request<any, Response, UserProperties>,
  res: Response,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  try {
    const user = (await User.findOne(username ? { username } : { email }))!;

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      throw new ValidationError('Incorrect password!', 'password');
    }

    const jwtSecret = process.env.JWT_SECRET!;

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({ message: 'Logged in successfully!' });
  } catch (err) {
    next(err);
  }
}

export async function httpLogout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('token', { secure: true, httpOnly: true, sameSite: 'strict' });
    res.json({ message: 'Logged out successfully!' });
  } catch (err) {
    next(err);
  }
}

export async function httpChangeUsername(
  req: AuthenticatedRequest<
    any,
    Response,
    { password: string; newUsername: string }
  >,
  res: Response,
  next: NextFunction
) {
  const { password, newUsername } = req.body;
  const username = req.user!.username;

  try {
    const user = (await User.findOne({ username }))!;

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      throw new ValidationError('Incorrect password!', 'password');
    }

    user.$set('username', newUsername);

    await user.save();

    res.json({ username: newUsername });
  } catch (err) {
    next(err);
  }
}

export async function httpChangePassword(
  req: AuthenticatedRequest<
    any,
    Response,
    { oldPassword: string; newPassword: string }
  >,
  res: Response,
  next: NextFunction
) {
  const { oldPassword, newPassword } = req.body;
  const username = req.user!.username;

  try {
    const user = (await User.findOne({ username }))!;

    const passwordMatches = await user.comparePassword(oldPassword);

    if (!passwordMatches) {
      throw new ValidationError('Incorrect password!', 'password');
    }

    user.password = newPassword;
    user.save();

    res.json({ message: 'Password changed successfully!' });
  } catch (err) {
    next(err);
  }
}
