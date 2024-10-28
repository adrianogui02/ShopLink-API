import express from 'express';
import router from './router/index';
import { checkDatabaseConnection } from './utils/checkDatabaseConnection';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app = express();

app.use(cors({
  origin: 'http://localhost:4000'
}));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

// Inicia o servidor
const startServer = async () => {
    await checkDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`[${process.env.API_NAME}] Server is running at http://localhost:${PORT}`);
    });
  }
  
  startServer();
