import { Schema, model } from 'mongoose';
import userConst from './usersConst.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: userConst.passwordMinLength,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: userConst.emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: userConst.subscriptionTypes,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

export default User;