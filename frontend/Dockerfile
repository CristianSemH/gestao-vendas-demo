FROM node:20

WORKDIR /app

# Apenas instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o resto
COPY . .

EXPOSE 3000

# Iniciar em modo desenvolvimento
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
