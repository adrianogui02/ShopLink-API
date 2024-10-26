import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Verifica se o token está presente no header Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
    
  }

  const token = authHeader.split(' ')[1]; // Extrai o token

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded; // Adiciona o usuário decodificado à requisição
    next(); // Passa para o próximo middleware ou controlador
  } catch (error) {
    res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    return ;
  };
};
