import { api } from "../api"

export const useApi = () => {
    const methods = {
        products: {
            get: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.get('/products')
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
            search: (data:{ search:string }, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.post('/products', data)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
            category: (id:number, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.post('/products/category', id)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
        }
    }

    return methods
}