import usersService from '../services/authServices.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await usersService.get({ email });

  if (existedUser) throw HttpError(409, 'Email in use');

  const hashPass = await bcrypt.hash(password, 12);

  const { subscription } = await usersService.add({
    email,
    password: hashPass,
  });

  const resBody = { user: { email, subscription } };

  res.status(201).json(resBody);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errorMessage = 'Email or password is wrong';

  const user = await usersService.get({ email });

  if (!user) throw HttpError(401, errorMessage);

  const isCorrectPass = await bcrypt.compare(password, user.password);

  if (!isCorrectPass) throw HttpError(401, errorMessage);

  const token = jwt.sign({ id: user._id }, process.env.DB_SECRET, {
    expiresIn: '23h',
  });

  await usersService.update({ id: user._id, token });

  const resBody = {
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  };

  res.json(resBody);
};

const logout = async (req, res, next) => {
  const user = await usersService.get({ _id: req.user._id });

  if (!user) throw HttpError(401);

  await usersService.update({ id: user._id, token: null });

  res.status(204).end();
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const updateSubscription = async (req, res, next) => {
  const { email, subscription } = await usersService.update({
    id: req.user._id,
    subscription: req.body.subscription,
  });

  const resBody = { user: { email, subscription } };

  res.json(resBody);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
};