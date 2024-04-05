import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../types';
import Profile from '../../models/Profile.model';
import User from '../../models/User.model';
import OauthUser from '../../models/OauthUser.model';
import UnauthorizedError from '../../errors/UnauthorizedError';

export async function httpGetProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const username = req.user!.username;

  try {
    if (!username) {
      throw new Error();
    }

    const user = req.user?.platform
      ? (await OauthUser.findOne({ username }))!
      : (await User.findOne({ username }))!;
    const profile = (await Profile.findOne({ _id: user._id }))!;

    const obj: any = { isOauth: !!req.user?.platform };

    obj.username = user.username;

    ['customize', 'stats'].forEach((key) => {
      obj[key] = profile[key as keyof typeof profile];
    });

    res.json(obj);
  } catch (err) {
    next(err);
  }
}

export async function httpGetHistory(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  try {
    const username = req.user!.username;

    const user = req.user?.platform
      ? (await OauthUser.findOne({ username }))!
      : (await User.findOne({ username }))!;

    const history = (await Profile.findOne({ _id: user._id }))!.history;
    const items = history.slice(limit * (page - 1), limit * (page - 1) + limit);

    return res.json({
      items,
      currentPage: page,
      totalPages: Math.ceil(history.length / limit),
    });
  } catch (err) {
    next(err);
  }
}

export async function httpPostCustomize(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const update = req.body;

  try {
    const username = req.user!.username;
    const updateSet: { [key: string]: any } = {};

    Object.keys(update).forEach((key) => {
      updateSet[`customize.${key}`] = update[key];
    });

    const user = req.user?.platform
      ? (await OauthUser.findOne({ username }))!
      : (await User.findOne({ username }))!;

    await Profile.updateOne({ _id: user._id }, { $set: updateSet });
    res.json({ message: 'Success!' });
  } catch (err) {
    next(err);
  }
}

export async function httpClearHistory(
  req: AuthenticatedRequest<any, Response, { password: string }>,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const username = req.user!.username;

  try {
    const user = req.user?.platform
      ? (await OauthUser.findOne({ username }))!
      : (await User.findOne({ username }))!;

    if (user instanceof User) {
      const passwordMatches = await user.comparePassword(password);

      if (!passwordMatches) {
        throw new UnauthorizedError('Incorrect password!');
      }
    }

    await Profile.findOneAndUpdate({ _id: user._id }, { history: [] });
    res.json({ message: 'History cleared successfully!' });
  } catch (err) {
    next(err);
  }
}

export async function httpResetStats(
  req: AuthenticatedRequest<any, Response, { password: string }>,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const username = req.user!.username;

  try {
    const user = req.user?.platform
      ? (await OauthUser.findOne({ username }))!
      : (await User.findOne({ username }))!;

    if (user instanceof User) {
      const passwordMatches = await user.comparePassword(password);

      if (!passwordMatches) {
        throw new UnauthorizedError('Incorrect password!');
      }
    }

    await Profile.findOneAndUpdate({ _id: user._id }, { stats: {} });
    res.json({ message: 'Stats reset successfully!' });
  } catch (err) {
    next(err);
  }
}
