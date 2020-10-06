import { Router } from 'express';

import UsersController from './controllers/c1_usersController';
const usercontroller = new UsersController();

const routers = Router();

routers.post('/register', usercontroller.create);

export default routers;