import { Router } from 'express';

import usersRouters from '../routes/r1_users';
import authorizationRouters from '../routes/r2_loginAuth';
import forgotPwdRouters from '../routes/r3_forgotPwd';
import resetPwdRouters from '../routes/r4_resetPwd';
import testAuthenticateController from '../routes/t1_testAuth';

const routes = Router();

routes
  .use('/users', usersRouters)
  .use('/auth', authorizationRouters)
  .use('/', forgotPwdRouters)
  .use('/', resetPwdRouters)
  .use('/', testAuthenticateController)
;

export default routes;