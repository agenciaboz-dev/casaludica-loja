import { useNavigate } from "react-router-dom"

export const useMenuLinks = () => {
    const navigate = useNavigate()

    const links: Link[] = [
        {
            id: 0,
            name: "Página Principal",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 1,
            name: "Coleções",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 2,
            name: "Categorias",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 3,
            name: "Meu Pedido",
            sublinks: [
                {
                    id: 0,
                    name: "Lista de itens",
                    location: "/",
                    onClick: () => navigate("/")
                },
                {
                    id: 1,
                    name: "Carrinho",
                    location: "/",
                    onClick: () => navigate("/")
                },
                {
                    id: 2,
                    name: "Pagamento",
                    location: "/",
                    onClick: () => navigate("/")
                }
            ],
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 4,
            name: "Siga a Rota para nossa loja  🏠",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 5,
            name: "Site institucional 🌏",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 6,
            name: "Adquira uma Franquia",
            location: "/",
            onClick: () => navigate("/")
        },
        {
            id: 7,
            name: "Onde encontrar | Nossas lojas",
            location: "/",
            onClick: () => navigate("/")
        }
    ]

    return links
}
