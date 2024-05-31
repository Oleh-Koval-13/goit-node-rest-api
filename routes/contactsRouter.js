import express from "express";
import contactsCtrl from '../controllers/contactsControllers.js';
import {
    createContactSchema,
    updateContactSchema,
    updateStatusSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';
import isValidId from '../middlewares/validateId.js';
import authControl from '../middlewares/authControl.js';

const contactsRouter = express.Router();

contactsRouter.use(authControl);

contactsRouter.get('/', contactsCtrl.getAll);

contactsRouter.get('/:id', isValidId, contactsCtrl.getOne);

contactsRouter.delete('/:id', isValidId, contactsCtrl.remove);

contactsRouter.post(
  '/',
  validateBody(createContactSchema, true),
  contactsCtrl.create
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(updateContactSchema, true),
  contactsCtrl.update
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateStatusSchema),
  contactsCtrl.updateStatus
);

export default contactsRouter;
