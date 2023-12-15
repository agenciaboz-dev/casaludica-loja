import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product } from "./Product"
import { Skeleton, Box, SxProps, useMediaQuery } from "@mui/material"
//import "./style.scss"
import { ReactComponent as BackgroundImage } from "../../../images/background/featured.svg"
import { useColors } from "../../../hooks/useColors"

interface FeaturedCategoryProps {}

export const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [title, setTitle] = useState("Para reunir a família")
    const [products, setProducts] = useState<Product[]>([])

    const api = useApi()
    const colors = useColors()

    const style_skeleton: SxProps = {
        width: isMobile ? "43vw" : "15vw",
        height: isMobile ? "75vw" : "23vw",

        ".skeleton:nth-child(2n)": {
            marginTop: "-10vw",
        },
    }
    useEffect(() => {
        api.products.category("11", {
            callback: (response: { data: Product[] }) => {
                setProducts(response.data)
            },
        })
    }, [])

    return (
        <Box
            className="FeaturedCategory-Component"
            sx={{ position: "relative", width: "100%", flexDirection: "column", gap: "1vw", color: colors.primary }}
        >
            {isMobile && (
                <BackgroundImage className="background" style={{ position: "absolute", top: "-35vw", left: "-5vw", zIndex: "-1", width: " 100vw" }} />
            )}
            <h3 style={{ fontSize: isMobile ? "5.5vw" : "2rem", width: "40vw" }}>{title}</h3>
            <Box
                className="product-list"
                sx={{
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "3vw",
                    "& .Product-Component:nth-child(2n)": { marginTop: isMobile ? "-17vw" : "" },
                }}
            >
                {products
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 4)
                    .map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                {products.length == 0 && (
                    <>
                        <Skeleton animation="wave" variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton animation="wave" variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton animation="wave" variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton animation="wave" variant="rounded" className="skeleton" sx={style_skeleton} />
                    </>
                )}
            </Box>
        </Box>
    )
}
