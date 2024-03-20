import { NextFunction, Response } from 'express';
import { CustomRequest } from '../../types';
import Profile, { ProfileProperties } from '../../models/Profile.model';

export async function httpTypingStarted(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const username = req.user?.username;

  if (!username) {
    return res.status(404).json({ message: 'User not found!' });
  }

  try {
    await Profile.updateOne({ username }, { $inc: { 'stats.testsStarted': 1 } });
  } catch (err) {
    next(err);
  }
}

export async function httpTypingCompleted(
  req: CustomRequest<any, any, Omit<ProfileProperties['history'][number], 'date'>>,
  res: Response,
  next: NextFunction
) {
  const result = req.body;

  if (
    result?.timeline?.length === 0 ||
    result?.errors === undefined ||
    result?.testType === undefined
  ) {
    console.log('error in typing completed!');
    return res.status(422).json({ message: 'Required property missing!' });
  }

  const username = req.user?.username;

  if (!username) {
    return res.status(404).json({ message: 'User not found!' });
  }

  try {
    const profile = await Profile.findOne({ username });

    if (!profile) {
      return res.status(404).json({ message: 'User not found!' });
    }

    profile.history.unshift({ ...result, date: new Date().toISOString() });
    profile.$inc('stats.testsCompleted', 1);

    const resultLatest = result.timeline[result.timeline.length - 1];

    const statsAverageKeys = [
      'wpm',
      'accuracy',
      'raw',
    ] as (keyof typeof profile.stats.average)[];

    statsAverageKeys.forEach((key) => {
      // Average
      const average = (profile.stats.average && profile.stats.average[key]) || 0;
      const testsCompleted = profile.stats.testsCompleted || 0;

      profile.$set(
        `stats.average.${key}`,
        Number(
          ((average * testsCompleted + resultLatest[key]) / testsCompleted).toFixed(
            2
          )
        )
      );

      // Highest
      const highest = (profile.stats.highest && profile.stats.highest[key]) || 0;

      if (highest < resultLatest[key]) {
        profile.$set(`stats.highest.${key}`, resultLatest[key]);
      }
    });

    await profile.save();
  } catch (err) {
    next(err);
  }
}
