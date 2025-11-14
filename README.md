# 🛒 Gestão de Vendas

Sistema completo de gerenciamento de vendas com API em Node.js +
Frontend em React, rodando em ambiente Docker para desenvolvimento.

## 📌 Visão Geral

Este projeto é uma aplicação full-stack composta por:

-   **Backend (API):** Node.js + Express + Sequelize\
-   **Frontend:** React + React-Bootstrap\
-   **Banco de Dados:** SQLite durante desenvolvimento (com suporte a PostgreSQL)\
-   **Ambiente:** Docker + docker-compose

O objetivo do sistema é fornecer uma base simples e direta para um fluxo
de vendas, cadastro de usuários, autenticação JWT e geração de
relatórios.

## 🏗️ Arquitetura do Projeto

    gestao-vendas-demo/
     ├── api/          → Backend Node.js (Express, Sequelize, JWT)
     ├── frontend/     → Frontend React
     ├── docker-compose.yml
     └── README.md

## 🚀 Tecnologias Utilizadas

### Backend (Node.js)

-   express
-   express-promise-router
-   sequelize
-   pg / sqlite3
-   jsonwebtoken
-   bcrypt
-   dotenv
-   axios
-   nodemon

### Frontend (React)

-   React 18
-   React Router DOM
-   React Hook Form
-   React Bootstrap
-   Bootstrap 5
-   React Select
-   React Datepicker
-   FontAwesome
-   Axios
-   pdfmake
-   dayjs / moment / date-fns
-   js-cookie

### Ambiente

-   Docker
-   docker-compose

## 🐳 Docker - Desenvolvimento

Para iniciar:

``` bash
docker-compose up --build
```

Serviços:

  Serviço    Porta   Descrição
  ---------- ------- -----------
  frontend   3000    React
  api        3001    Node.js

## 🔧 Backend

Scripts:

``` bash
npm run dev
npm start
npm run lint
```

## 🎨 Frontend

Scripts:

``` bash
npm start
npm build
npm test
```

## 🔐 Autenticação

JWT + cookies + middlewares.

## 📂 Variáveis de Ambiente

Arquivo `api/.env`:

    JWT_SECRET=sua_chave
    DATABASE_URL=sqlite:./database.sqlite
    PORT=3001