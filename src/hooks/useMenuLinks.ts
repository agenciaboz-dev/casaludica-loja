import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useFranchise } from "./useFranchise"

export const useMenuLinks = () => {
    const navigate = useNavigate()

    const { franchise, currentAddress } = useFranchise()

    const links: Link[] = useMemo(
        () => [
            {
                id: 0,
                name: "Página Principal",
                location: "/",
                onClick: () => navigate("/"),
            },
            {
                id: 1,
                name: "Coleções",
                location: "/collections",
                onClick: () => navigate("/collections"),
            },
            {
                id: 2,
                name: "Categorias",
                location: "/categories",
                onClick: () => navigate("/categories"),
            },
            {
                id: 3,
                name: "Meus Pedidos",
                // sublinks: [
                //     {
                //         id: 0,
                //         name: "Lista de itens",
                //         location: "/",
                //         onClick: () => navigate("/")
                //     },
                //     {
                //         id: 1,
                //         name: "Carrinho",
                //         location: "/",
                //         onClick: () => navigate("/")
                //     },
                //     {
                //         id: 2,
                //         name: "Pagamento",
                //         location: "/",
                //         onClick: () => navigate("/")
                //     }
                // ],
                location: "/orders",
                onClick: () => navigate("/orders"),
            },
            {
                id: 4,
                name: "Siga a Rota para nossa loja  🏠",
                location: "/",
                onClick: () => {
                    const source = `${currentAddress?.logradouro}+${currentAddress?.bairro}+${currentAddress?.localidade}+${currentAddress?.uf}`
                    const destination = `${franchise?.address.street}+${franchise?.address.number}+${franchise?.address.district}+${franchise?.address.city}+${franchise?.address.uf}`
                    const url = `https://maps.google.com/maps?saddr=${source}&daddr=${destination}&hl=pt`
                    return window.open(url, "_blank")?.focus()
                },
            },
            {
                id: 5,
                name: "Site institucional 🌏",
                location: "/",
                onClick: () => window.open("https://casaludica.com.br", "_blank")?.focus(),
            },
            {
                id: 6,
                name: "Adquira uma Franquia",
                location: "/",
                onClick: () => window.open("https://franquia.casaludica.com.br", "_blank")?.focus(),
            },
            {
                id: 7,
                name: "Onde encontrar | Nossas lojas",
                location: "/",
                onClick: () => window.open("https://casaludica.com.br/onde-encontrar", "_blank")?.focus(),
            },
        ],
        [franchise, currentAddress]
    )

    return links
}
