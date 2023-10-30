import { api } from "../api"
import { useLoading } from "./useLoading"

interface ApiOptions {
    data?: any
    callback: Function
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const { loading, setLoading } = useLoading()

    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.error(error)
    }

    const defaultFinally = (finallyCallback?: Function) => {
        finallyCallback && finallyCallback()
    }

    const methods = {
        products: {
            get: (callback: Function, errorCallback: Function = (error: any) => console.error(error), finallyCallback: Function = () => null) => {
                // setLoading(true)
                api.get("/products")
                    .then((response) => callback(response))
                    .catch((error) => errorCallback(error))
                    .finally(() => {
                        // setLoading(false)
                        finallyCallback()
                    })
            },
            popular: (callback: Function, errorCallback: Function = (error: any) => console.error(error), finallyCallback: Function = () => null) => {
                api.get("/products/popular")
                    .then((response) => callback(response))
                    .catch((error) => errorCallback(error))
                    .finally(() => {
                        finallyCallback()
                    })
            },
            search: (data: { search: string }, options: ApiOptions) => {
                // setLoading(true)
                api.post("/products", data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            category: (category: string, options: ApiOptions) => {
                // setLoading(true)
                api.post("/products/category", { id: Number(category) })
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            collection: (options: ApiOptions) => {
                api.post("/products/collection", { categories: options.data })
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            id: (options: ApiOptions) => {
                api.post("/products/id", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
        images: async (id: number, mainOnly?: boolean) => (await api.post("/products/images", { id, mainOnly })).data,
        categories: {
            get: (callback: Function, errorCallback: Function = (error: any) => console.error(error), finallyCallback: Function = () => null) => {
                // setLoading(true)
                api.get("/categories")
                    .then((response) => callback(response))
                    .catch((error) => errorCallback(error))
                    .finally(() => {
                        // setLoading(false)
                        finallyCallback()
                    })
            },
        },
        cep: {
            get: (options: ApiOptions) => {
                api.post("/cep", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
        },
    }

    return methods
}
