import { createContext, useEffect, useState } from 'react';
import React from "react"
import { useApi } from '../hooks/useApi';

interface CategoriesContextValue {
    value: Category[]
    setValue: (value:Category[]) => void
}

interface CategoriesProviderProps {
    children: React.ReactNode
}

const CategoriesContext = createContext<CategoriesContextValue>({} as CategoriesContextValue);

export default CategoriesContext;

export const CategoriesProvider:React.FC<CategoriesProviderProps> = ({children}) => {
    const [value, setValue] = useState<Category[]>([])
    const api = useApi()

    useEffect(() => {
        console.log({ categories: value })
    }, [value])

    useEffect(() => {
        api.categories.get((response: { data:Category[] }) => setValue(response.data))
    }, [])

    return (
         <CategoriesContext.Provider value={{value, setValue}}>
              {children}
         </CategoriesContext.Provider>
    )
}