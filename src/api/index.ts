import axios from 'axios';

export const api = axios.create({
    baseURL: "https://app.agenciaboz.com.br:4100/api",
    timeout: 1000 * 10,
})