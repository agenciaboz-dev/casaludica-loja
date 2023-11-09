import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Skeleton, Paper, Grid } from "@mui/material"
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
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{ width: "37vw", height: "auto", borderRadius: "5vw" }}
                    />
                    <h4
                        style={{
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: "40vw",
                        }}
                    >
                        {product.resume}
                    </h4>
                    <h2
                        style={{
                            textAlign: "center",
                            fontSize: "4vw",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: "40vw",
                            color: "#363775",
                        }}
                    >
                        R${product.price}
                    </h2>
                    <ButtonComponent onClick={() => cart.add(product)}>Quero esse</ButtonComponent>
                </>
            ) : (
                <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }}>
                    <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                    <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                    <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                </Box>
            )}
        </Box>
    )
}
