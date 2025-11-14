import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'estado';

export const getEstados = async (token) => {
    return await axios.get(`${baseUrl}/${endpont}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterEstados = async (estado, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${estado}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getEstadosById = async (estadoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${estadoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addEstado = async (estado, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, estado, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteEstado = async (estadoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${estadoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateEstado = async (estadoId, estado, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${estadoId}`, estado, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
