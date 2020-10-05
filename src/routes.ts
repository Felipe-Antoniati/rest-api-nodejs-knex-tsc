import { Router, Request, Response } from 'express';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hello World'
  })
});

export default routers;