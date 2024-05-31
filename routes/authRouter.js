import express from 'express';
import authCtrl from '../controllers/authControllers.js';
import userSchemas from '../schemas/usersSchemas.js';
import validateBody from '../helpers/validateBody.js';
import authControl from '../middlewares/authControl.js';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(userSchemas.create, true),
  authCtrl.register
);

usersRouter.post(
  '/login',
  validateBody(userSchemas.create, true),
  authCtrl.login
);

usersRouter.post('/logout', authControl, authCtrl.logout);

usersRouter.get('/current', authControl, authCtrl.current);

usersRouter.patch(
  '/',
  authControl,
  validateBody(userSchemas.updateSubscription),
  authCtrl.updateSubscription
);

export default usersRouter;