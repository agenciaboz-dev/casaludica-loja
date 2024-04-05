import { IconButton, Box, TextField, Skeleton, Avatar, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { ReactComponent as CloseIcon } from "../../images/x.svg"
import { useDynamicImage } from "../../hooks/useDynamicImage"

interface ProductProps {
    product: Product
    hideCloseButton?: boolean
}

export const Product: React.FC<ProductProps> = ({ product, hideCloseButton }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cart = useCart()
    const navigate = useNavigate()

    const productRef = useDynamicImage(product)

    const deleteProduct = () => {
        if (cart.products.length > 1) {
            cart.remove(product)
        } else {
            cart.remove(product)
            navigate("/")
        }
    }

    const total = product.price * product.quantity
    return (
        <Box
            sx={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                gap: "3vw",
                overflow: "hidden",
                width: 1,
              
            }}
            ref={productRef}
        >
            {product.cover ? (
                <Avatar
                    src={"data:image/jpeg;base64," + product.cover}
                    variant="rounded"
                    alt="product"
                    style={{ width: "12vw", height: "12vw" }}
                />
            ) : (
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: isMobile ? "37vw" : "10vw", height: isMobile ? "37vw" : "10vw", flexShrink: 0 }}
                />
            )}
            <Box
                sx={{
                    color: "#363775",
                    fontWeight: "500",
                    fontSize: "3vw",
                    flexDirection: "column",
                    gap: "1.8vw",
                    overflow: "hidden",
                    width: 1,
        
                }}
            >
                <Box sx={{ flexDirection: "column", width: 1 }}>
                    <Box sx={{ width: 1, overflow: "hidden" }}>
                        <Box sx={{ flexDirection: "column", width: 1 }}>
                            <Box sx={{ width: "100%" }}>
                                <div
                                    style={{
                                        width: "100%", // Garante que o contêiner tenha uma largura definida
                                        fontSize: "3.2vw",
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap", // Impede que o texto quebre em várias linhas
                                        overflow: "hidden", // Esconde qualquer texto que exceda a largura do contêiner
                                        textOverflow: "ellipsis", // Adiciona ellipsis ao final do texto escondido
                                    }}
                                >
                                    {product.name}
                                </div>
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "1vw", alignItems: "center" }}>
                                <p style={{ fontSize: "3.2vw" }}>Quantidade: {product.quantity} </p>
                            </Box>
                        </Box>
                    </Box>
                    <p style={{ fontSize: isMobile ? "3.5vw" : "1.5vw" }}>
                        Preço unitário:{" "}
                        <span style={{ color: "#686868", fontWeight: "bolder", fontSize: isMobile ? "3.8vw" : "1.8vw" }}>
                            R${product.price.toFixed(2)}
                        </span>
                    </p>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", gap: "2vw" }}>
                        <p style={{ fontSize: "3.5vw" }}>
                            Custo: <span style={{ color: "#686868", fontSize: "3.8vw" }}>R${product.price.toFixed(2)}</span>
                        </p>
                        <p style={{ fontSize: "3.5vw" }}>
                            Total: <span style={{ color: "#686868", fontSize: "3.8vw" }}>R${total.toFixed(2)}</span>
                        </p>
                    </Box>
                </Box>
            </Box>
            {!hideCloseButton && (
                <IconButton
                    className="close"
                    onClick={deleteProduct}
                    sx={{ position: "absolute", top: "0vw", right: "0vw", padding: 0 }}
                >
                    <CloseIcon style={{ height: "auto", width: "6vw" }} />
                </IconButton>
            )}
        </Box>
    )
}
