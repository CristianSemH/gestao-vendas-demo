import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'categoria';

export const getCategorias = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err;
    });
};

export const getCategoriasById = async (categoriaId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${categoriaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addCategoria = async (categoria, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, categoria, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteCategoria = async (categoriaId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${categoriaId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateCategoria = async (categoriaId, categoria, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${categoriaId}`, categoria, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
