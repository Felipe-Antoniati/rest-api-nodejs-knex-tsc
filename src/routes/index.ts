import { Router } from 'express';

import usersRouters from '../routes/r1_users';

const routes = Router();

routes.use('/register', usersRouters)

export default routes;