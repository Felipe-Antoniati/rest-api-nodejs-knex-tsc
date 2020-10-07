import {Request, Response} from 'express';
import connectionToDataBase from '../database/connection';

export default class forgotPasswordController {
  
  async create(req: Request, res: Response) {
    const { email, token, password } = req.body;

    try {
    // Buscar email do usuário na base de dados para validação;
    const user = await connectionToDataBase('users')
      .where('email', email)
      .select(
        'tokenToResetPwd', 
        'resetTokenExpires', 
        'password'
      )
      .first()
    ;
    // Validar se o email existe;
    if(!user){
      return res.status(400).json({
        error: 'No such User.'
      });
    };
    // Validar se os Tokens são iguais;
    if(token !== user.tokenToResetPwd) {
      return res.status(400).json({
        error: 'Token Invalid.'
      });
    };

    // Atualizar a Senha;
    await connectionToDataBase('users')
    .where('email', email) 
    .update({
       password: password
     }); 

     // Mensagem de sucesso
     return res.status(200).json({
      message: 'Password changed successfully'
     });
    
     // Se der errado, retorne uma mensagem de erro inesperado.
    } catch (err) {
      console.log(err);
      return res.status(400).json({ 
        error: 'Unexpected Error while send email'    
      });
    };
  };
};