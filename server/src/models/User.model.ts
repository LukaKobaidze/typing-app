import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import ValidationError from '../errors/ValidationError';
import NotFoundError from '../errors/NotFoundError';

export interface UserProperties {
  username: string;
  email: string;
  password: string;
}

interface UserInterface extends Document, UserProperties {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Account must have a username!'],
    unique: true,
    maxlength: [16, 'Username should not be longer than 16 characters!'],
    validate: {
      validator: (username: string) => {
        return !!username.match(/^([a-z]|[0-9])*$/i);
      },
      message: 'Username can only contain latin characters and numbers!',
    },
  },
  email: {
    type: String,
    required: [true, 'Account must have an email!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Account must have a password!'],
    minlength: [8, 'Password must be 8 characters or longer!'],
  },
});

userSchema.post('findOne', (res, next) => {
  if (!res) {
    next(new NotFoundError('User not found!'));
  }
  next();
});

userSchema.pre('save', async function (next) {
  const thisObj = this as UserInterface;

  if (thisObj.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      thisObj.password = await bcrypt.hash(thisObj.password, salt);
    } catch (err: any) {
      return next(err);
    }
  } else {
    next();
  }
});

userSchema.post('save', (err: any, doc: any, next: any): void => {
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

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserInterface>('User', userSchema, 'users');

export default User;
