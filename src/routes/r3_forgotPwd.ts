import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPwdController from '../controllers/c3_forgotPwdController';
const forgotPwdController = new ForgotPwdController();

const forgotPwdRouter = Router();

forgotPwdRouter.post('/forgot_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
  })
}), forgotPwdController.create);

export default forgotPwdRouter;