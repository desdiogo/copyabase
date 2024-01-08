# Use a imagem oficial do Node.js como base
FROM node:20

# Configuração do diretório de trabalho
WORKDIR /app/frontend

# Copia os arquivos necessários
COPY package.json .
COPY pnpm-lock.yaml .

# Instalar pnpm
RUN npm i -g pnpm

# Instala as dependências
RUN pnpm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Expõe a porta do frontend
EXPOSE 5173

# Comando para iniciar o servidor de produção
CMD ["pnpm", "dev", "--host"]