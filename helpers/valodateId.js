import mongoose from 'mongoose';
import HttpError from './HttpError.js';

export default function isValidId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    next(HttpError(400, 'Invalid ID'));
  }
  next();
}