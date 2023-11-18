import { useContext } from 'react'
import CategoriesContext from '../contexts/categoriesContext'

export const useCategories = () => {
    const categoriesContext = useContext(CategoriesContext);
    const { collections, setCollections } = categoriesContext

    return { categories: categoriesContext.value, setCategories: categoriesContext.setValue, collections, setCollections }
}