import { Category } from "../definitions/products"

export const useCategories = () => {
    const categories:Category[] = [
        {
            id: 1,
            name: 'Cartas'
        },
        {
            id: 2,
            name: 'Brinquedos'
        },
        {
            id: 3,
            name: 'Roupas'
        },
        {
            id: 4,
            name: 'Playgrounds'
        },
    ]

    return categories
}