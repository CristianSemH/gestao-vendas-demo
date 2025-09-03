import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'cidade';

export const getCidades = async (token) => {
    return await axios.get(`${baseUrl}/${endpont}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getCidadesPorEstado = async (idEstado,token) => {
    return await axios.get(`${baseUrl}/${endpont}/${idEstado}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getFilterCidades = async (cidade,token) => {
    return await axios.get(`${baseUrl}/${endpont}/filter/${cidade}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getCidadesById = async (cidadeId,token) => {
    return await axios.get(`${baseUrl}/${endpont}/${cidadeId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addCidade = async (cidade,token) => {
    return await axios.post(`${baseUrl}/${endpont}`, cidade, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteCidade = async (cidadeId,token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${cidadeId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateCidade = async (cidadeId, cidade,token) => {
    return await axios.put(`${baseUrl}/${endpont}/${cidadeId}`, cidade, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
