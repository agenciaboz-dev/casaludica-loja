import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Skeleton, Paper, Grid, Button, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const cart = useCart()

    const productRef = useDynamicImage(product)

    const skeleton_style = {
        height: isMobile ? "8vw" : "2vw",
        width: "100%",
    }

    const image_skeleton_style = {
        height: isMobile ? "40vw" : "15vw",
        width: isMobile ? "40vw" : "15vw",
        borderRadius: isMobile ? "5vw" : "1vw",
    }

    const button_Style = {
        borderRadius: isMobile ? "20vw" : "2vw",
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
                gap: isMobile ? "3vw" : "2vw",
                justifyContent: "space-around",
                borderRadius: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "4vw" : "1vw",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)"
            }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{ marginBottom: "1vw" }}
            ref={productRef}>
            {product.cover ? (
                <>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{ width: isMobile ? "40vw" : "15vw", height: "auto", borderRadius: isMobile ? "5vw" : "1vw" }}
                    />
                    <Box sx={{ flexDirection: "column", alignItems: "center", gap: "2vw" }}>
                        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw" }}>
                            <h4
                                style={{
                                    textAlign: "start",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: isMobile ? "40vw" : "100%"
                                }}>
                                {product.name}
                            </h4>
                            <p
                                style={{
                                    textAlign: "start",
                                    overflow: "hidden",
                                    width: isMobile ? "40vw" : "100%",
                                    maxHeight: "13vw",
                                    textTransform: "lowercase",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3, // Defina o número máximo de linhas que deseja exibir
                                    whiteSpace: "normal"
                                }}>
                                {product.description}
                            </p>
                            <h2
                                style={{
                                    textAlign: "start",
                                    fontSize: isMobile ? "5vw" : "1.5rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: isMobile ? "40vw" : "100%",
                                    color: "#363775"
                                }}>
                                R${product.price}
                            </h2>
                        </Box>
                        <Button onClick={() => cart.add(product)} color="success" variant="contained" fullWidth sx={{ ...button_Style }}>
                            Quero esse
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />

                    <Box sx={{ width: isMobile ? "45%" : "100%", flexDirection: "column", gap: "2vw" }}>
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
