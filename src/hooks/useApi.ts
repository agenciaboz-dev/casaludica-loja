import { AxiosResponse } from "axios"
import { api, bozpayApi } from "../api"
import { useFranchise } from "./useFranchise"

interface ApiOptions {
    data?: any
    callback: (response: AxiosResponse) => void
    errorCallback?: Function
    finallyCallback?: Function
}

export const useApi = () => {
    const { franchise } = useFranchise()

    const defaultError = (error: Error, errorCallback?: Function) => {
        errorCallback && errorCallback()
        console.error(error)
    }

    const defaultFinally = (finallyCallback?: Function) => {
        finallyCallback && finallyCallback()
    }

    const methods = {
        products: {
            list: (callback: Function, errorCallback: Function = (error: any) => console.error(error), finallyCallback: Function = () => null) => {
                // setLoading(true)
                api.post("/products", { franchise: franchise?.id })
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
                api.post("/products", { search: data.search, franchise: franchise?.id })
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            category: (category: string, options: ApiOptions) => {
                // setLoading(true)
                api.post("/products", { category: Number(category), franchise: franchise?.id })
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            collection: (collectionId: number, options: ApiOptions) => {
                api.post("/products", { collection: collectionId, franchise: franchise?.id })
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            id: (id: number, options: ApiOptions) => {
                api.post("/products/id", { id, franchise: franchise?.id })
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
        collections: {
            get: (callback: Function, errorCallback: Function = (error: any) => console.error(error), finallyCallback: Function = () => null) => {
                // setLoading(true)
                api.get("/collections")
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
        order: {
            new: (options: ApiOptions) => {
                api.post("/order/new", options.data)
                    .then((response) => options.callback(response))
                    .catch((error) => defaultError(error, options.errorCallback))
                    .finally(() => defaultFinally(options.finallyCallback))
            },
            get: {
                id: (store: string, referenceId: string, options: ApiOptions) =>
                    bozpayApi
                        .post("/order", { store, referenceId })
                        .then((response) => options.callback(response))
                        .catch((error) => defaultError(error, options.errorCallback))
                        .finally(() => defaultFinally(options.finallyCallback)),
                user: (user_id: number) => api.post("/order/user", { user_id, store_id: franchise?.id }),
            },
        },

        user: {
            isSignedUp: (login: string) => api.post("/user/exists", { login }),
            login: (login: string, password: string) => api.post("/user/login", { login, password }),
            uploadProfilePic: (formdata: FormData, user_id: number) => api.post(`/user/upload_profile_pic/${user_id}`, formdata),
        },
    }

    return methods
}
