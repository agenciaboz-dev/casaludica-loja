import axios from 'axios';

export const api = axios.create({
    baseURL: "http://192.168.15.30:4100/api",
    timeout: 1000 * 10,
})