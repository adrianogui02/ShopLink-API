import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserCreateInput, UserLoginInput } from './types';

const prisma = new PrismaClient(); 
const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken'; 


export const createUser = async (data: UserCreateInput) => {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  return prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      role: data.role || 'USER',
    },
  });
};

export const loginUser = async (data: UserLoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user || !(await bcrypt.compare(data.senha, user.senha))) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
