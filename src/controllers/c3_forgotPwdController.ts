import {Request, Response} from 'express';
import connectionToDataBase from '../database/connection';
import generateToken from '../utils/generateToken';

import Mailer from '../services/mail/nodemailer';
let mailer = new Mailer(); 

export default class forgotPasswordController {
  
  async create(req: Request, res: Response) {
    // Requisição do email para recuperação de senha;  
    const { email } = req.body;

    try {
    // Buscar email do usuário na base de dados para validação;
    const user = await connectionToDataBase('users')
      .where({email})
      .select('email')
      .first()
    ;
    // Validar se o email existe;
    if(!user){
      return res.status(400).json({
        error: 'No such User.'
      });
    };

    // Gerar um Token para redefinição de senha com data de expiração;
    const resetToken = generateToken({id: user.id});

   // Atualizar o Token;
   await connectionToDataBase('users')
   .where({email}) 
   .update({
      tokenToResetPwd: resetToken
    }); 
 
    // Enviar email para o usuário com o Token;
    mailer.sendMail( 
      'antoniati.felipe@gmail.com',  
      'Token para recuperar senha',  
      '<h2>Token:</h2> '+resetToken
    ).then( (msg) => { 
      console.log(`sendMail result :(${msg})`); 
    }); 

    // Mensagem de sucesso
    return res.status(200).json({
      message: 'Email sent successfully'
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