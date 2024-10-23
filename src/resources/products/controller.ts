import { Request, Response } from 'express';
import * as productService from './service';
import { ProductCreateInput } from './types';
import { checkAlreadyExists } from './helper';
import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { uploadToPinataBase64 } from './helper';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const produtos = await productService.getAllProducts();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produto = await productService.getProductById(String(id));
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o produto' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao, preco } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ error: 'Pelo menos uma imagem é obrigatória' });
      return;
    }

    if(!checkAlreadyExists(nome)){
      res.status(400).json({ error: 'Nome do produto já existe' });
      return;
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const imageUrl = await uploadToPinataBase64(file);
      imageUrls.push(imageUrl);
    }

    // Preenche os dados do produto com as URLs das imagens
    const productData = {
      nome,
      descricao,
      preco: parseFloat(preco),
      imagemUrls: imageUrls, 
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, descricao, preco, imagemUrl } = req.body;
  try {
    const produtoAtualizado = await productService.updateProduct(String(id), { nome, descricao, preco, imagemUrl });
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await productService.deleteProduct(String(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
