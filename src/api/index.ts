import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:4100/api",
    timeout: 1000 * 10,
})