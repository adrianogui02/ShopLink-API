import { PrismaClient } from '@prisma/client';
import { ProductCreateInput, ProductUpdateInput } from './types';

const prisma = new PrismaClient();

export const getAllProducts = async () => { 
  return prisma.product.findMany({
    include: {
      imagens: true, 
    },
  });
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
        create: data.imagemUrls.map((url) => ({ url })), 
      },
    },
    include: {
      imagens: true, 
    },
  });
};


export const updateProduct = async (id: string, data: ProductUpdateInput) => {
  return prisma.product.update({
    where: { id },
    data: {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      imagens: {
        deleteMany: {}, 
        create: data.imagemUrls.map((url) => ({ url })), 
      },
    },
    include: {
      imagens: true, 
    },
  });
};

export const deleteProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error('Produto não encontrado');
  }

  return await prisma.product.delete({
    where: { id },
  });
};
