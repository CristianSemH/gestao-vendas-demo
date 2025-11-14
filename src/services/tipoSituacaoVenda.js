import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'tipoSituacao/venda';

export const getTipoSituacaos = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterTipoSituacaos = async (tipoSituacao, token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${tipoSituacao}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getTipoSituacaosById = async (tipoSituacaoId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${tipoSituacaoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addTipoSituacao = async (tipoSituacao, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, tipoSituacao, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteTipoSituacao = async (tipoSituacaoId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${tipoSituacaoId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateTipoSituacao = async (tipoSituacaoId, tipoSituacao, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${tipoSituacaoId}`, tipoSituacao, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
