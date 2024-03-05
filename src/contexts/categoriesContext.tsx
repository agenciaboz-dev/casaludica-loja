import { createContext, useEffect, useState } from 'react';
import React from "react"
import { useApi } from '../hooks/useApi';
import { AxiosResponse } from "axios"
import { sentenceCase } from "change-case"
import { useFranchise } from "../hooks/useFranchise"

interface CategoriesContextValue {
    value: Category[]
    setValue: (value: Category[]) => void

    collections: Collection[]
    setCollections: React.Dispatch<React.SetStateAction<Collection[]>>
}

interface CategoriesProviderProps {
    children: React.ReactNode
}

const CategoriesContext = createContext<CategoriesContextValue>({} as CategoriesContextValue)

export default CategoriesContext

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const api = useApi()
    const { franchise } = useFranchise()

    const [value, setValue] = useState<Category[]>([])
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        console.log({ collections })
    }, [collections])

    useEffect(() => {
        const categories = value
        console.log({ categories })
        if (categories.length > 0) {
            api.collections.get((response: AxiosResponse) => {
                const collections: Collection[] = []
                const nocategories_collections: Collection[] = response.data

                nocategories_collections.map((collection) => {
                    const collection_categories = categories.filter((category) => category.collectionId == collection.id)
                    collections.push({ id: collection.id, name: sentenceCase(collection.name), categories: collection_categories })
                })

                setCollections(collections)
            })
        }
    }, [value])

    useEffect(() => {
        if (franchise) {
            api.categories.get((response: { data: Category[] }) => setValue(response.data))
        }
    }, [franchise])

    return <CategoriesContext.Provider value={{ value, setValue, collections, setCollections }}>{children}</CategoriesContext.Provider>
}