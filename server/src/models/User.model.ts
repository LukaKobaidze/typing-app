import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserProperties {
  username: string;
  email: string;
  password: string;
}

interface UserInterface extends Document, UserProperties {
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

userSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
