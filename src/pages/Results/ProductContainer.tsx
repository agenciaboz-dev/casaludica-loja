import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Skeleton, Paper, Grid, Button } from "@mui/material"
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
        height: "8vw",
        width: "100%",
    }

    const image_skeleton_style = {
        height: "40vw",
        width: "40vw",
        borderRadius: "5vw",
    }
    const button_Style = {
        borderRadius: "20vw",
        border: "none",
        color: "white",

        justifyContent: "center",
        alignItems: "center",
        fontFamily: "BowlbyOneSC",
    }

    return (
        <Box
            className="results-container"
            style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                gap: "3vw",
                justifyContent: "space-around",
                borderRadius: "5vw",
                padding: "4vw",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{ marginBottom: "1vw" }}
            ref={productRef}
        >
            {product.cover ? (
                <>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{ width: "40vw", height: "auto", borderRadius: "5vw" }}
                    />
                    <Box sx={{ flexDirection: "column", alignItems: "center", gap: "2vw" }}>
                        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw" }}>
                            <h4
                                style={{
                                    textAlign: "start",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "40vw",
                                }}
                            >
                                {product.name}
                            </h4>
                            <p
                                style={{
                                    textAlign: "start",
                                    overflow: "hidden",
                                    width: "40vw",
                                    maxHeight: "13vw",
                                    textTransform: "lowercase",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3, // Defina o número máximo de linhas que deseja exibir
                                    whiteSpace: "normal",
                                }}
                            >
                                {product.description}
                            </p>
                            <h2
                                style={{
                                    textAlign: "start",
                                    fontSize: "5vw",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "40vw",
                                    color: "#363775",
                                }}
                            >
                                R${product.price}
                            </h2>
                        </Box>
                        <Button
                            onClick={() => cart.add(product)}
                            sx={{
                                ...button_Style,
                                width: "100%",
                                backgroundColor: "#34A853",
                            }}
                        >
                            Quero esse
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />

                    <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                        <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                        <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                        <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                        <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                    </Box>
                </>
            )}
        </Box>
    )
}
