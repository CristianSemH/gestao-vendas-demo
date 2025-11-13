import { Route, Routes } from 'react-router-dom'
import RouterPrivate from './Private/Private';
import React from "react"
import UsuarioList from '../pages/usuario';
import UsuarioCreate from '../pages/usuario/create';
import UsuarioUpdate from '../pages/usuario/update';
import CategoriaList from '../pages/categoria';
import CategoriaCreate from '../pages/categoria/create';
import CategoriaUpdate from '../pages/categoria/update';
import TipoEnderecoList from '../pages/tipoEndereco';
import TipoEnderecoCreate from '../pages/tipoEndereco/create';
import TipoEnderecoUpdate from '../pages/tipoEndereco/update';
import FormaPagamentoList from '../pages/formaPagamento';
import FormaPagamentoCreate from '../pages/formaPagamento/create';
import FormaPagamentoUpdate from '../pages/formaPagamento/update';
import TipoGastoList from '../pages/tipoGasto';
import TipoGastoCreate from '../pages/tipoGasto/create';
import TipoGastoUpdate from '../pages/tipoGasto/update';
import TipoSituacaoVendaList from '../pages/tipoSituacaoVenda';
import TipoSituacaoVendaCreate from '../pages/tipoSituacaoVenda/create';
import TipoSituacaoVendaUpdate from '../pages/tipoSituacaoVenda/update';
import TipoSituacaoDespesaList from '../pages/tipoSituacaoDespesa';
import TipoSituacaoDespesaCreate from '../pages/tipoSituacaoDespesa/create';
import TipoSituacaoDespesaUpdate from '../pages/tipoSituacaoDespesa/update';
import ProdutoList from '../pages/produto';
import ProdutoCreate from '../pages/produto/create';
import ProdutoUpdate from '../pages/produto/update';
import ClienteList from '../pages/cliente';
import ClienteCreate from '../pages/cliente/create';
import ClienteUpdate from '../pages/cliente/update';
import OrcamentoVendaList from '../pages/orcamentoVenda';
import OrcamentoVendaCreate from '../pages/orcamentoVenda/create';
import OrcamentoVendaUpdate from '../pages/orcamentoVenda/update';
import DespesaList from '../pages/despesa';
import DespesaCreate from '../pages/despesa/create';
import DespesaUpdate from '../pages/despesa/update';
import Login from '../pages/login'
import Home from './../Home'

export function Router() {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/home" element={<RouterPrivate><Home /></RouterPrivate>}></Route>
            <Route exact path="/" element={<RouterPrivate><Home /></RouterPrivate>}></Route>
            <Route exact path="/usuario" element={<RouterPrivate><UsuarioList /></RouterPrivate>}></Route>
            <Route path="/usuario/create" element={<RouterPrivate><UsuarioCreate /></RouterPrivate>}></Route>
            <Route path="/usuario/update/:id" element={<RouterPrivate><UsuarioUpdate /></RouterPrivate>}></Route>
            <Route exact path="/categoria" element={<RouterPrivate><CategoriaList /></RouterPrivate>}></Route>
            <Route path="/categoria/create" element={<RouterPrivate><CategoriaCreate /></RouterPrivate>}></Route>
            <Route path="/categoria/update/:id" element={<RouterPrivate><CategoriaUpdate /></RouterPrivate>}></Route>
            <Route exact path="/tipoendereco" element={<RouterPrivate><TipoEnderecoList /></RouterPrivate>}></Route>
            <Route path="/tipoendereco/create" element={<RouterPrivate><TipoEnderecoCreate /></RouterPrivate>}></Route>
            <Route path="/tipoendereco/update/:id" element={<RouterPrivate><TipoEnderecoUpdate /></RouterPrivate>}></Route>
            <Route exact path="/formapagamento" element={<RouterPrivate><FormaPagamentoList /></RouterPrivate>}></Route>
            <Route path="/formapagamento/create" element={<RouterPrivate><FormaPagamentoCreate /></RouterPrivate>}></Route>
            <Route path="/formapagamento/update/:id" element={<RouterPrivate><FormaPagamentoUpdate /></RouterPrivate>}></Route>
            <Route exact path="/tipogasto" element={<RouterPrivate><TipoGastoList /></RouterPrivate>}></Route>
            <Route path="/tipogasto/create" element={<RouterPrivate><TipoGastoCreate /></RouterPrivate>}></Route>
            <Route path="/tipogasto/update/:id" element={<RouterPrivate><TipoGastoUpdate /></RouterPrivate>}></Route>
            <Route exact path="/tiposituacaovenda" element={<RouterPrivate><TipoSituacaoVendaList /></RouterPrivate>}></Route>
            <Route path="/tiposituacaovenda/create" element={<RouterPrivate><TipoSituacaoVendaCreate /></RouterPrivate>}></Route>
            <Route path="/tiposituacaovenda/update/:id" element={<RouterPrivate><TipoSituacaoVendaUpdate /></RouterPrivate>}></Route>
            <Route exact path="/tiposituacaodespesa" element={<RouterPrivate><TipoSituacaoDespesaList /></RouterPrivate>}></Route>
            <Route path="/tiposituacaodespesa/create" element={<RouterPrivate><TipoSituacaoDespesaCreate /></RouterPrivate>}></Route>
            <Route path="/tiposituacaodespesa/update/:id" element={<RouterPrivate><TipoSituacaoDespesaUpdate /></RouterPrivate>}></Route>
            <Route exact path="/produto" element={<RouterPrivate><ProdutoList /></RouterPrivate>}></Route>
            <Route path="/produto/create" element={<RouterPrivate><ProdutoCreate /></RouterPrivate>}></Route>
            <Route path="/produto/update/:id" element={<RouterPrivate><ProdutoUpdate /></RouterPrivate>}></Route>
            <Route exact path="/cliente" element={<RouterPrivate><ClienteList /></RouterPrivate>}></Route>
            <Route path="/cliente/create" element={<RouterPrivate><ClienteCreate /></RouterPrivate>}></Route>
            <Route path="/cliente/update/:id" element={<RouterPrivate><ClienteUpdate /></RouterPrivate>}></Route>
            <Route exact path="/orcamentovenda" element={<RouterPrivate><OrcamentoVendaList /></RouterPrivate>}></Route>
            <Route path="/orcamentovenda/create" element={<RouterPrivate><OrcamentoVendaCreate /></RouterPrivate>}></Route>
            <Route path="/orcamentovenda/update/:id" element={<RouterPrivate><OrcamentoVendaUpdate /></RouterPrivate>}></Route>
            <Route exact path="/despesa" element={<RouterPrivate><DespesaList /></RouterPrivate>}></Route>
            <Route path="/despesa/create" element={<RouterPrivate><DespesaCreate /></RouterPrivate>}></Route>
            <Route path="/despesa/update/:id" element={<RouterPrivate><DespesaUpdate /></RouterPrivate>}></Route>
        </Routes>
    )
}