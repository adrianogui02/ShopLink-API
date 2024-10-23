import { PrismaClient } from '@prisma/client';
import { ProductCreateInput, ProductUpdateInput } from './types';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const createProduct = async (data: ProductCreateInput) => {
  return prisma.product.create({
    data: {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      imagens: {
        create: data.imagemUrls.map((url) => ({ url })), // Trabalhando com as imagens associadas
      },
    },
    include: {
      imagens: true, // Incluir as imagens relacionadas na resposta
    },
  });
};


export const updateProduct = async (id: string, data: ProductUpdateInput) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
