# 🛒  Gestão de vendas Web
Frontend do sistema de gestão de vendas, desenvolvido com **React 18**, **React Bootstrap** e ferramentas modernas de formulários e relatórios.

## 🚀 Tecnologias
- React 18
- React Router DOM
- React Hook Form
- React Bootstrap + Bootstrap 5
- React Select
- React Datepicker
- FontAwesome
- Axios
- pdfmake
- dayjs / moment / date-fns
- js-cookie

## 📂 Estrutura
```
frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── services/
 │    └── App.js
 ├── public/
 └── package.json
```

## ▶️ Scripts
```bash
npm start   # desenvolvimento
npm build   # produção
npm test    # testes
```

## 🌐 Conexão com a API
Configure o endpoint principal em um serviço Axios:

```js
axios.defaults.baseURL = "https://api.seuservidor.com";
```

Para Docker local:

```
http://api:3001
```

## 🐳 Docker
O frontend foi preparado para rodar com hot reload em ambiente Docker.