import {PrismaClient} from "@prisma/client";
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
import { PinataSDK } from "pinata-web3";
dotenv.config();

const pinataGroup = String(process.env.PINATA_GROUP)

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "blue-accused-toucan-16.mypinata.cloud",
});

const prisma = new PrismaClient();

export const checkAlreadyExists = async (nome: string): Promise<boolean> => {
    return !!(await prisma.product.findUnique({where: {nome}}));
}

// Função para converter o arquivo para base64
const fileToBase64 = (file: Express.Multer.File): string => {
  const base64 = file.buffer.toString('base64');
  return base64;
};

// Função para fazer o upload usando o Pinata SDK
export const uploadToPinataBase64 = async (file: Express.Multer.File): Promise<string> => {
  const base64File = fileToBase64(file);

  try {
    // Faz o upload em base64 usando o SDK do Pinata
    const response = await pinata.upload.base64(base64File).group(pinataGroup);

    // Obtenha o ipfsHash da resposta
    const ipfsHash = response.IpfsHash;

    // Construa a URL da imagem usando o gateway IPFS
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    

    // Retornar a URL do arquivo enviado
    return imageUrl;

  } catch (error) {
    console.error('Erro ao enviar o arquivo para o Pinata:', error);
    throw new Error('Falha no upload da imagem');
  }
};
  