import { Skeleton, Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product as Container } from "./Product"
import { useColors } from "../../../hooks/useColors"
import { useProducts } from "../../../hooks/useProducts"
//import "./style.scss"

interface PopularProps {}

export const Popular: React.FC<PopularProps> = ({}) => {
    const api = useApi()
    const colors = useColors()
    const { products } = useProducts()

    useEffect(() => {}, [])

    return (
        <Box className="Popular-Component" sx={{ width: " 100%", flexDirection: "column", color: colors.primary, gap: "1vw" }}>
            <h3 style={{ fontSize: "4vw" }}>Mais curtidos pela galerinha</h3>
            <Box className="products-container" sx={{ width: "100vw", marginLeft: "-5vw", padding: "1vw 5vw", gap: "2vw", overflowX: "auto" }}>
                {products
                    .sort((a, b) => a.id - b.id)
                    .slice(0, 5)
                    .sort((a, b) => b.sold - a.sold)
                    .map((product) => (
                        <Container key={product.id} product={product} />
                    ))}
                {products.length == 0 && (
                    <>
                        <Skeleton sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                        <Skeleton sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                        <Skeleton sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                    </>
                )}
            </Box>
        </Box>
    )
}
