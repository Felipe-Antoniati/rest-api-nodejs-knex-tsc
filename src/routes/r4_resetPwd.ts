import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ResetPwdController from '../controllers/c4_resetPwdController';
const resetPwdController = new ResetPwdController();

const resetPwdRouter = Router();

resetPwdRouter.post('/reset_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
    password: Joi.string().required()
  })
}), resetPwdController.create);

export default resetPwdRouter;