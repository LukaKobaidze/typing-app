import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserProperties } from '../../models/User.model';
import Profile from '../../models/Profile.model';

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

    const profile = new Profile({ username });
    await profile.save();

    const token = jwt.sign({ userId: user._id }, jwtSecret);

    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json({ message: 'Account created successfully!' });
  } catch (err) {
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
    const user = await User.findOne(username ? { username } : { email });

    if (!user) {
      return res
        .status(404)
        .json({ error: true, status: 404, message: 'User not found!' });
    }

    const passwordMatches = await user.validatePassword(password);

    if (!passwordMatches) {
      return res
        .status(401)
        .json({ error: true, status: 401, message: 'Incorrect password!' });
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
