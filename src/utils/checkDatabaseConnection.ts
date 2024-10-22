import { PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const checkDatabaseConnection = async (): Promise<void> =>{
    try{
        await prisma.$connect();
        console.log(`[${process.env.API_NAME}] Database connection successfully`);
    } catch(err){
        const error  = err as PrismaClientInitializationError
        console.log(`[${process.env.API_NAME}] Error connecting to the database:`, error.message);
        process.exit(1);
    } finally{
        await prisma.$disconnect();
    }
}