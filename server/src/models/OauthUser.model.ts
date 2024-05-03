import mongoose, { Schema } from 'mongoose';
import ValidationError from '../errors/ValidationError';
import { PlatformType } from '../types';

interface OauthUserProperties {
  userId: number;
  platform: PlatformType;
  username?: string;
}

const oauthUserSchema = new Schema({
  userId: { type: Number, required: true },
  platform: {
    type: String,
    enum: ['GitHub', 'Google'] as PlatformType[],
    required: true,
  },
  username: {
    type: String,
    unique: true,
    maxlength: [16, 'Username should not be longer than 16 characters!'],
    validate: {
      validator: (username: string) => {
        return !!username.match(/^([a-z]|[0-9])*$/i);
      },
      message: 'Username can only contain latin characters and numbers!',
    },
  },
});

oauthUserSchema.post('save', (err: any, doc: any, next: any): void => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    next(
      new ValidationError(
        `${field[0].toUpperCase() + field.slice(1)} is already taken.`,
        field
      )
    );
  }

  if (err.name === 'ValidationError') {
    const error = err?.errors[Object.keys(err.errors)[0]];
    next(new ValidationError(error.properties.message, error.path));
  }

  next();
});

const OauthUser = mongoose.model<OauthUserProperties>(
  'OauthUser',
  oauthUserSchema,
  'users'
);

export default OauthUser;
