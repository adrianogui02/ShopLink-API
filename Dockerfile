# Use uma imagem Node.js como base
FROM node:18

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta onde a API será executada
EXPOSE 3000

# Roda a aplicação com o arquivo compilado
CMD ["npm", "run", "start:production"]
