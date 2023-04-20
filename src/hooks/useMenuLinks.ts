import type { Link, Sublink } from '../definitions/menu'

export const useMenuLinks = () => {
    const links:Link[] = [
        {
            id: 0,
            name: 'Página Principal',
            location: '/'
        },
        {
            id: 1,
            name: 'Coleções',
            location: '/'
        },
        {
            id: 2,
            name: 'Categorias',
            location: '/'
        },
    ]

    return links
}