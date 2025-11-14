import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'despesa';


export const getDespesas = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getDespesasById = async (despesaId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${despesaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addDespesa = async (despesa, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, despesa, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteDespesa = async (despesaId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${despesaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateDespesa = async (despesaId, despesa, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${despesaId}`, despesa, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
