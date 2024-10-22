import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export const checkAlreadyExists = async (nome: string): Promise<boolean> => {
    return !!(await prisma.produto.findUnique({where: {nome}}));
}