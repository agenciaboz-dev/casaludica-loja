import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { useApi } from "../hooks/useApi"
import { useFranchise } from "../hooks/useFranchise"

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
    const api = useApi()
    const { franchise } = useFranchise()

    const [value, setValue] = useState<Product[]>([])

    const addProduct = (product: Product) => {
        setValue((value) => [...value.filter((item) => item.id != product.id), product])
    }

    useEffect(() => {
        console.log({ products: value })
    }, [value])

    useEffect(() => {
        if (franchise) {
            api.products.list((response: { data: Product[] }) => setValue(response.data))
        }
    }, [franchise])

    return <ProductsContext.Provider value={{ value, setValue, addProduct }}>{children}</ProductsContext.Provider>
}