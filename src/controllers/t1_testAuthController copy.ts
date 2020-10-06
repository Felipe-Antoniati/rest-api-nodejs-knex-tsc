import {Request, Response} from 'express';

export default class testAuthenticateController {
  async index(req: Request, res: Response) {
    return res.status(200).json({
      message: '[OK] Authenticate successful!'
    })
  };
};
