import { api } from "../api"
import { Category, Collection } from "../definitions/products"
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
			get: (
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				setLoading(true)
				api.get('/products')
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						setLoading(false)
						finallyCallback()
					})
			},
			popular: (
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				api.get('/products/popular')
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						finallyCallback()
					})
			},
			search: (
				data: { search: string },
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				setLoading(true)
				api.post('/products', data)
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						setLoading(false)
						finallyCallback()
					})
			},
			category: (
				category: Category,
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				setLoading(true)
				api.post('/products/category', category)
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						setLoading(false)
						finallyCallback()
					})
			},
			collection: (
				categories: number[],
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				api.post('/products/collection', { categories })
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						finallyCallback()
					})
			},
		},
		categories: {
			get: (
				callback: Function,
				errorCallback: Function = (error: any) => console.error(error),
				finallyCallback: Function = () => null
			) => {
				setLoading(true)
				api.get('/categories')
					.then((response) => callback(response))
					.catch((error) => errorCallback(error))
					.finally(() => {
						setLoading(false)
						finallyCallback()
					})
			},
		},
		cep: {
			get: (options: ApiOptions) => {
				api.post('/cep', options.data)
					.then((response) => options.callback(response))
					.catch((error) => defaultError(error, options.errorCallback))
					.finally(() => defaultFinally(options.finallyCallback))
			},
		},
	}

	return methods
}