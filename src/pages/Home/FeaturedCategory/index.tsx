import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product } from "./Product"
import { Skeleton, Box, SxProps } from "@mui/material"
//import "./style.scss"
import { ReactComponent as BackgroundImage } from "../../../images/background/featured.svg"
import { useColors } from "../../../hooks/useColors"

interface FeaturedCategoryProps {}

export const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({}) => {
    const [title, setTitle] = useState("Para reunir a família")
    const [categories, setCategories] = useState([1, 2, 3, 4])
    const [products, setProducts] = useState<Product[]>([])

    const api = useApi()
    const colors = useColors()

    const style_skeleton: SxProps = {
        width: "43vw",
        height: "75vw",

        ".skeleton:nth-child(2n)": {
            marginTop: "-10vw",
        },
    }
    useEffect(() => {
        api.products.collection({
            data: categories,
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
            <BackgroundImage
                className="background"
                style={{ position: "absolute", top: "-35vw", left: "-5vw", zIndex: "-1", width: " 100vw" }}
            />
            <h3 style={{ fontSize: "5.5vw", width: "40vw" }}>{title}</h3>
            <Box className="product-list" sx={{ flexWrap: "wrap", justifyContent: "space-between", gap: "3vw" }}>
                {products.slice(0, 4).map((product) => (
                    <Product key={product.id} product={product} />
                ))}
                {products.length == 0 && (
                    <>
                        <Skeleton variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton variant="rounded" className="skeleton" sx={style_skeleton} />
                        <Skeleton variant="rounded" className="skeleton" sx={style_skeleton} />
                    </>
                )}
            </Box>
        </Box>
    )
}
