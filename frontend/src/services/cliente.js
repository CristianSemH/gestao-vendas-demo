import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'cliente';

export const getClientes = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterClientes = async (cliente, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${cliente}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getClientesById = async (clienteId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${clienteId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addCliente = async (cliente, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, cliente, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteCliente = async (clienteId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${clienteId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateCliente = async (clienteId, cliente, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${clienteId}`, cliente, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
