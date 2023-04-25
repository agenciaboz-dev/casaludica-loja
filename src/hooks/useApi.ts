import { api } from "../api"
import { Category, Collection } from "../definitions/products"
import { useLoading } from "./useLoading"

export const useApi = () => {
    const {loading, setLoading} = useLoading()
    
    const methods = {
        products: {
            get: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                setLoading(true)
                api.get('/products')
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    setLoading(false)
                    finallyCallback()
                })
            },
            popular: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                api.get('/products/popular')
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    finallyCallback()
                })
            },
            search: (data:{ search:string }, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                setLoading(true)
                api.post('/products', data)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    setLoading(false)
                    finallyCallback()
                })
            },
            category: (category:Category, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                setLoading(true)
                api.post('/products/category', category)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    setLoading(false)
                    finallyCallback()
                })
            },
            collection: (collection:Collection, callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                setLoading(true)
                api.post('/products/collection', collection)
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    setLoading(false)
                    finallyCallback()
                })
            },
        },
        categories: {
            get: (callback:Function, errorCallback:Function = (error: any) => console.error(error), finallyCallback:Function = () => null) => {
                setLoading(true)
                api.get('/categories')
                .then(response => callback(response))
                .catch(error => errorCallback(error))
                .finally(() => {
                    setLoading(false)
                    finallyCallback()
                })
            },
        }
    }

    return methods
}