import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { useApi } from '../hooks/useApi';
import { Product } from '../definitions/products';

interface ProductsContextValue {
    value: Product[];
    setValue: (value:Product[]) => void;
}

interface ProductsProviderProps {
    children: React.ReactNode
}

const ProductsContext = createContext<ProductsContextValue>({} as ProductsContextValue);

export default ProductsContext;

export const ProductsProvider:React.FC<ProductsProviderProps> = ({children}) => {
    const [value, setValue] = useState<Product[]>([])
    const api = useApi()

    useEffect(() => {
        console.log({products: value})
    }, [value])

    useEffect(() => {
        api.products((response: { data:Product[] }) => setValue(response.data))
    }, [])

    return (
         <ProductsContext.Provider value={{value, setValue}}>
              {children}
         </ProductsContext.Provider>
    )
}