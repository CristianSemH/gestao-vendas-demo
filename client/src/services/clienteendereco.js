import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'clienteendereco';

export const getClienteenderecos = async (token) => {
    return await axios.get(`${baseUrl}/${endpont}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterClienteenderecos = async (clienteendereco, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${clienteendereco}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getClienteenderecosById = async (clienteenderecoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${clienteenderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addClienteendereco = async (clienteendereco, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, clienteendereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteClienteendereco = async (clienteenderecoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${clienteenderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateClienteendereco = async (clienteenderecoId, clienteendereco, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${clienteenderecoId}`, clienteendereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
