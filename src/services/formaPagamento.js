import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'formaPagamento';

export const getFormaPagamentos = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFormaPagamentosById = async (formaPagamentoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${formaPagamentoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addFormaPagamento = async (formaPagamento, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, formaPagamento, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteFormaPagamento = async (formaPagamentoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${formaPagamentoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateFormaPagamento = async (formaPagamentoId, formaPagamento, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${formaPagamentoId}`, formaPagamento, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
