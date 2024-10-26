import { Request, Response } from 'express';
import * as userService from './service';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, role } = req.body;
    const newUser = await userService.createUser({ nome, email, senha, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;
    const token = await userService.loginUser({ email, senha });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Email ou senha inválidos' });
  }
};
