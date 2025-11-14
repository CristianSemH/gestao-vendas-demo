import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'produto';

export const getProdutos = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getProdutosById = async (produtoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${produtoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addProduto = async (produto, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, produto, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteProduto = async (produtoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${produtoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateProduto = async (produtoId, produto, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${produtoId}`, produto, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
