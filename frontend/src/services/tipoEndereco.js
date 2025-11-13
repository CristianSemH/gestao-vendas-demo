import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'tipoEndereco';

export const getTipoEnderecos = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getTipoEnderecosById = async (tipoEnderecoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${tipoEnderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addTipoEndereco = async (tipoEndereco, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, tipoEndereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteTipoEndereco = async (tipoEnderecoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${tipoEnderecoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateTipoEndereco = async (tipoEnderecoId, tipoEndereco, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${tipoEnderecoId}`, tipoEndereco, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
