import axios from 'axios';

export const api = axios.create({
    // baseURL: "http://localhost:4100/api",
    // baseURL: "https://app.agenciaboz.com.br:4100/api",
    baseURL: "https://agencyboz.com:4100/api",
    // timeout: 1000 * 10,
})

export const bozpayApi = axios.create({ baseURL: "https://app.agenciaboz.com.br:4118/api" })