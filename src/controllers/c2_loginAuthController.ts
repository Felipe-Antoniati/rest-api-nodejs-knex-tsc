import {Request, Response} from 'express';
import connectionToDataBase from '../database/connection';
import generateToken from '../utils/generateToken';

export default class loginAuhtorizationController {
  
  async create(req: Request, res: Response) {
    // Requisição dos dados de usuário para Logon;
    const { 
      email, password
    } = req.body;
    
    try {
      // Buscar email e senhas do usuário para validação;
      const user = await connectionToDataBase('users')
        .where({email})
        .select('email', 'password')
        .first()
      ;
      // Validar se o usuário existe na base de dados;
      if(!user){
        return res.status(400).json({
          error: 'No such User.'
        });
      };
      // Validar se a senha do usuário esta correta;
      if(user.password !== password) {
        return res.status(400).json({
          error: 'Invalid Password.'
        });
      };

      // Mensagem de sucesso com os dados do usuário e token;
      return res.status(200).json({
        message: 'Logon successful',
        user: user.firstname,
        token: generateToken({id: user.id})
      });
      
    // Se der errado, retorne uma mensagem de erro inesperado.
    } catch (err) {
      console.log(err);
      return res.status(400).json({ 
        error: 'Unexpected Error in Logon.'
      });
    };
  };
};
