import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'tipoGasto';

export const getTipoGastos = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};


export const getFilterTipoGastos = async (tipoGasto, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${tipoGasto}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getTipoGastosById = async (tipoGastoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${tipoGastoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addTipoGasto = async (tipoGasto, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, tipoGasto, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteTipoGasto = async (tipoGastoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${tipoGastoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateTipoGasto = async (tipoGastoId, tipoGasto, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${tipoGastoId}`, tipoGasto, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
