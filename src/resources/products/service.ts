import { PrismaClient } from '@prisma/client';
import { ProductCreateInput, ProductUpdateInput } from './types';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.produto.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.produto.findUnique({
    where: { id },
  });
};

export const createProduct = async (data: ProductCreateInput) => {
  return prisma.produto.create({
    data,
  });
};

export const updateProduct = async (id: string, data: ProductUpdateInput) => {
  return prisma.produto.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.produto.delete({
    where: { id },
  });
};
