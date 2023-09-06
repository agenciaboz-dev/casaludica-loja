import { Promotion } from "../definitions/products"

export const usePromotions = () => {
    const promotions: Promotion[] = [
        {
            id: 1,
            image_url: "https://loja.casaludica.com.br/wp-content/uploads/2023/07/Peca-1-Marketplace-Doe-Esperanca-1.webp",
            subtitle: "",
        },
        {
            id: 2,
            image_url: "https://loja.casaludica.com.br/wp-content/uploads/2023/07/Peca-1-Marketplace-Doe-Esperanca.webp",
            subtitle: "",
        },
        {
            id: 3,
            image_url: "https://loja.casaludica.com.br/wp-content/uploads/2023/07/Peca-1-Marketplace-Diretor-de-Escola-copiar.webp",
            subtitle: "",
        },
        {
            id: 3,
            image_url: "https://loja.casaludica.com.br/wp-content/uploads/2023/07/Peca-1-Marketplace-To-de-Ferias.webp",
            subtitle: "",
        },
    ]

    return promotions
}