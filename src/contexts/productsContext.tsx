import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { useApi } from "../hooks/useApi"

interface ProductsContextValue {
    value: Product[]
    setValue: (value: Product[]) => void
    addProduct: (product: Product) => void
}

interface ProductsProviderProps {
    children: React.ReactNode
}

const ProductsContext = createContext<ProductsContextValue>({} as ProductsContextValue);

export default ProductsContext;

export const ProductsProvider:React.FC<ProductsProviderProps> = ({children}) => {
    const [value, setValue] = useState<Product[]>([])
    const api = useApi()

    const addProduct = (product: Product) => {
        setValue((value) => [...value.filter((item) => item.id != product.id), product])
    }

    useEffect(() => {
        console.log({ products: value })
    }, [value])

    useEffect(() => {
        api.products.list((response: { data: Product[] }) => setValue(response.data))
    }, [])

    return <ProductsContext.Provider value={{ value, setValue, addProduct }}>{children}</ProductsContext.Provider>
}