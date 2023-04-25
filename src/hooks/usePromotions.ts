import { Promotion } from "../definitions/products"

export const usePromotions = () => {
    const promotions:Promotion[] = [
        {
            id: 1,
            image_url: '/1.png',
            subtitle: 'Até 5x sem juros'
        },
        {
            id: 2,
            image_url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
            subtitle: 'Até 8x sem juros'
        },
    ]

    return promotions
}