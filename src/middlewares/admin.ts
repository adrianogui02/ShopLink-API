import { Request, Response, NextFunction } from 'express';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {  
    res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar essa ação.' });
    return 
  }
  next();
};
