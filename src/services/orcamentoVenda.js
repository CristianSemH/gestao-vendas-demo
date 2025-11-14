import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'orcamentoVenda';

export const getOrcamentoVendas = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getOrcamentoVendasById = async (orcamentoVendaId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${orcamentoVendaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addOrcamentoVenda = async (orcamentoVenda, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, orcamentoVenda, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteOrcamentoVenda = async (orcamentoVendaId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${orcamentoVendaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateOrcamentoVenda = async (orcamentoVendaId, orcamentoVenda, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${orcamentoVendaId}`, orcamentoVenda, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
