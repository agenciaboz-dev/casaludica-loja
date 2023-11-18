import { useCategories } from "./useCategories"

export const useCollections = () => {
    const { collections } = useCategories()

    return collections
}
