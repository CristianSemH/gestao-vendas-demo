import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'endereco';

export const getEnderecos = async (token) => {
    return await axios.get(`${baseUrl}/${endpont}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getEnderecosForCliente = async (idCliente, token) => {
    return await axios.get(`${baseUrl}/${endpont}/cliente/${idCliente}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterEnderecos = async (endereco, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${endereco}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getEnderecosById = async (enderecoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${enderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addEndereco = async (endereco, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, endereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteEndereco = async (enderecoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${enderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateEndereco = async (enderecoId, endereco, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${enderecoId}`, endereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
