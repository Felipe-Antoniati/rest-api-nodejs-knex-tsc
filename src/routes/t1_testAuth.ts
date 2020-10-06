import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';

import TestAuthenticateController from '../controllers/t1_testAuthController copy';
const testAuthenticateController = new TestAuthenticateController();

const usersRouters = Router();

usersRouters.get('/test', checkJwt, testAuthenticateController.index);

export default usersRouters;