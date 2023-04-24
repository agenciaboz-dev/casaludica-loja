import { Promotion } from "../definitions/products"

export const usePromotions = () => {
    const promotions:Promotion[] = [
        {
            id: 1,
            image_url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
            subtitle: 'Até 5x sem juros'
        },
        {
            id: 2,
            image_url: 'https://static.vecteezy.com/ti/fotos-gratis/p3/6671766-fantastica-lua-magica-luz-e-agua-barco-com-arvore-papel-de-parede-gratis-foto.jpg',
            subtitle: 'Até 5x sem juros'
        },
    ]

    return promotions
}