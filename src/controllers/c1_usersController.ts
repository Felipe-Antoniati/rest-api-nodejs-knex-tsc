import {Request, Response} from 'express';
import connectionToDataBase from '../database/connection';
import crypto from 'crypto';

export default class userController {
  
  async create(req: Request, res: Response) {
    // Requisição dos dados de usuário para Cadastro;
    const { 
      firstname, lastname, email, password
    } = req.body;
    
    // Criar um hash para o ID de usuário;
    const id = crypto.randomBytes(16).toString('hex');

    // Tente inserir os dados de usuário na Base de dados;
    try {
      await connectionToDataBase('users').insert({
        id, firstname, lastname, email, password
      });
      // Retorne uma mensagem de sucesso com os dados do usuário criado;
      return res.status(201).json({
        message: 'User created successfully!',
        welcome: firstname
      });
      
      // Se der errado, retorne uma mensagem de erro inesperado.
    } catch (err) {
      console.log(err);
      return res.status(400).json({ 
        error: 'Unexpected Error while creating User.'
      });
    };
  };
};
