import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../components/ButtonComponent"
import { useCart } from "../../hooks/useCart"
import { useApi } from "../../hooks/useApi"
import { sentenceCase } from "change-case"
import { useProducts } from "../../hooks/useProducts"
import { useDynamicImage } from "../../hooks/useDynamicImage"

interface ProductContainerProps {
    product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    const navigate = useNavigate()
    const cart = useCart()

    const productRef = useDynamicImage(product)

    const skeleton_style = {
        height: "10vw",
        width: "100%",
    }

    const image_skeleton_style = {
        height: "40vw",
        width: "40vw",
        borderRadius: "5vw",
    }

    return (
        <Box
            className="results-container"
            style={{ flexDirection: "column", alignItems: "center" }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{ marginBottom: "10vw" }}
            ref={productRef}
        >
            {product.cover ? (
                <>
                    <h1>{sentenceCase(product.name, { locale: "pt-br" })}</h1>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{ width: "50vw", height: "auto", borderRadius: "5vw" }}
                    />
                    <h3>{product.resume}</h3>
                    <p>{product.description}</p>
                    <ButtonComponent onClick={() => cart.add(product)}>Quero esse</ButtonComponent>
                </>
            ) : (
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "100%", alignItems: "center" }}>
                    <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                    <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                    <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                </Box>
            )}
        </Box>
    )
}
