import axios from 'axios';
import ConfigApi from './config';

const baseUrl = ConfigApi.baseUrl
const endpont = 'cep';

export const getCep = async (cep, token) => {
    return await axios.get(`${baseUrl}/${endpont}/${cep}`, {
        headers: { 'Authorization': token }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err
    });
};

