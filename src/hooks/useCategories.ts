import { SetStateAction, useEffect, useState } from "react"
import { Category } from "../definitions/products"
import { useApi } from "./useApi"

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const api = useApi()

    useEffect(() => {
        api.categories.get((response: { data:Category[] }) => {
            setCategories(response.data)
        })
    }, [])

    return categories
}