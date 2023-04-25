import { api } from "../api"
import { Category, Collection } from "../definitions/products"

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
            category: (category:Category, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.post('/products/category', category)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
            collection: (collection:Collection, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.post('/products/collection', collection)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
        },
        categories: {
            get: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => api.get('/categories')
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => finallyCallback()),
        }
    }

    return methods
}