import {Request, Response, NextFunction} from 'express';
import jwtToken from 'jsonwebtoken';
import { secretKey } from '../config/auth.json';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
      
    // Requisição do Token de autorização;
    const headerAuthorization = req.headers.authorization;

    // Validar se o Token foi providenciado;
    if(!headerAuthorization) {
      return res.status(400).json({
        error: 'No Token provided'
      });
    }

    // Validar se o token está no Formato correto;
    const splitToken: string[] = headerAuthorization.split(' ');
    if(!(splitToken.length === 2)) {
      return res.status(400).json({
        erro: 'Token is not separated into two parts'
      });
    };

    const [scheme, token] = splitToken;

    // Validar se a primeira parte do token contem o Bearer;
    if(!/^Bearer$/i.test(scheme)){
      return res.status(400).json({
        erro: 'Token is not separated into two parts'
      });
    };
    
    let jwtPayload: any;
     jwtPayload = jwtToken.verify(token, secretKey, (err) => {
      if(err) {
        return res.status(400).json({
          erro: 'Token invalid'
        });
      };

      res.locals.jwtPayload = jwtPayload;
    });

    return next();
  };



