import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'users';

export const getUsers = async (limit, offset, filtro, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${limit}/${offset}${filtro ? `/` + filtro : ``}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const getUsersById = async (userId, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${userId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const addUser = async (user, token) => {
    return await axios.post(`${baseUrl}/${endpont}`, user, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const deleteUser = async (userId, token) => {
    return await axios.delete(`${baseUrl}/${endpont}/${userId}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const updateUser = async (userId, user, token) => {
    return await axios.put(`${baseUrl}/${endpont}/${userId}`, user, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

export const LoginUser = async (user, token) => {
    return await axios.post(`${baseUrl}/${endpont}/login`, user).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};
