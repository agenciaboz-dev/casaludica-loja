export const useMenuLinks = () => {
    const links: Link[] = [
        {
            id: 0,
            name: "Página Principal",
            location: "/",
        },
        {
            id: 1,
            name: "Coleções",
            location: "/",
        },
        {
            id: 2,
            name: "Categorias",
            location: "/",
        },
        {
            id: 3,
            name: "Meu Pedido",
            sublinks: [
                {
                    id: 0,
                    name: "Lista de itens",
                    location: "/",
                },
                {
                    id: 1,
                    name: "Carrinho",
                    location: "/",
                },
                {
                    id: 2,
                    name: "Pagamento",
                    location: "/",
                },
            ],
            location: "/",
        },
        {
            id: 4,
            name: "Siga a Rota para nossa loja  🏠",
            location: "/",
        },
        {
            id: 5,
            name: "Site institucional 🌏",
            location: "/",
        },
        {
            id: 6,
            name: "Adquira uma Franquia",
            location: "/",
        },
        {
            id: 7,
            name: "Onde encontrar | Nossas lojas",
            location: "/",
        },
    ]

    return links
}
