import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/dist/font/Inter/inter.css';
import '../src/dist/css/style.css';
import App from './App';
import '../src/dist/css/custom.css';
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './components/context/Provider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter >
  </React.StrictMode>

);
