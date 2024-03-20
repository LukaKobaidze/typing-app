import { NextFunction, Response } from 'express';
import { CustomRequest } from '../../types';
import Profile from '../../models/Profile.model';

export async function httpGetProfile(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const filter = req.query.filter as string;
  const username = req.user?.username;

  try {
    const profile = await Profile.findOne({ username });

    const filterAccepted = ['username', 'customize', 'stats', 'history'];

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found!' });
    }

    if (filter) {
      const obj: any = {};

      filter.split(',').forEach((key) => {
        if (filterAccepted.includes(key)) {
          obj[key] = profile[key as keyof typeof profile];
        }
      });

      return res.json(obj);
    }

    const obj: any = {};
    filterAccepted.forEach(
      (key) => (obj[key] = profile[key as keyof typeof profile])
    );
    res.json(obj);
  } catch (err) {
    next(err);
  }
}

export async function httpPostCustomize(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const update = req.body;

  try {
    const username = req.user?.username;

    if (!username) {
      return res.status(404).json({ message: 'Profile not found!' });
    }

    const updateSet: { [key: string]: any } = {};

    Object.keys(update).forEach((key) => {
      updateSet[`customize.${key}`] = update[key];
    });

    await Profile.updateOne({ username }, { $set: updateSet });
  } catch (err) {
    next(err);
  }
}
