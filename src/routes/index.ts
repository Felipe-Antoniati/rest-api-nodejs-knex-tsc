import { Router } from 'express';

import usersRouters from '../routes/r1_users';
import authorizationRouters from '../routes/r2_loginAuth';
import testAuthenticateController from '../routes/t1_testAuth';

const routes = Router();

routes.use('/users', usersRouters)
routes.use('/auth', authorizationRouters)
routes.use('/', testAuthenticateController)

export default routes;