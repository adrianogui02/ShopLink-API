import { Request, Response } from 'express';
import * as productService from './service';
import { ProductCreateInput } from './types';
import { checkAlreadyExists } from './helper';
import { StatusCodes,ReasonPhrases } from 'http-status-codes';

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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductCreateInput = req.body;
    if(!(await checkAlreadyExists(product.nome))){
        const newProduct = await productService.createProduct(product);
        res.json(newProduct);
    } else{
        res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);   
    }
  } catch (error) {
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
