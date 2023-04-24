import { api } from "../api"

export const useApi = () => {
    const methods = {
        products: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.get('/products')
        .then(response => callback(response))
        .catch(error => errorCallback(error))
        .finally(() => finallyCallback())
    }

    return methods
}