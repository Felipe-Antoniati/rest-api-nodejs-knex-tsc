import jwtToken from 'jsonwebtoken';
import { secretKey } from '../config/auth.json';

export default function generateToken(params = {} ) {
  // Token JWT válido por 1 Dia.
  return jwtToken.sign(params, secretKey, 
    { expiresIn: 86400 }
  );
};