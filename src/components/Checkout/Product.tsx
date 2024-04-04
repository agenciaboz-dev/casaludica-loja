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
    return (
        <Box sx={{ position: "relative", justifyContent: isMobile ? "center" : "start", alignItems: "center", gap: "3vw" }} ref={productRef}>
            {product.cover ? (
                <Avatar
                    src={"data:image/jpeg;base64," + product.cover}
                    variant="rounded"
                    alt="product"
                    style={{ width: isMobile ? "37vw" : "10vw", height: isMobile ? "37vw" : "10vw" }}
                />
            ) : (
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: isMobile ? "37vw" : "10vw", height: isMobile ? "37vw" : "10vw", flexShrink: 0 }}
                />
            )}
            <Box sx={{ color: "#363775", fontWeight: "500", fontSize: isMobile ? "3vw" : "1.2vw", flexDirection: "column" }}>
                <Box sx={{ flexDirection: "column", gap: isMobile ? "1.8vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3.2vw" : "1.5vw" }}>
                        Produto: <span style={{ fontWeight: "bold", fontSize: isMobile ? "3.2vw" : "1.8vw" }}>{product.name}</span>
                    </p>
                    <Box sx={{ flexDirection: "row", gap: "1vw", alignItems: "center" }}>
                        <p>Quantidade: {product.quantity} </p>
                    </Box>
                    <p style={{ fontSize: isMobile ? "3.5vw" : "1.5vw" }}>
                        Preço unitário:{" "}
                        <span style={{ color: "#686868", fontWeight: "bolder", fontSize: isMobile ? "3.8vw" : "1.8vw" }}>
                            R${product.price.toFixed(2)}
                        </span>
                    </p>
                </Box>
            </Box>
            {!hideCloseButton && (
                <IconButton className="close" onClick={deleteProduct} sx={{ position: "absolute", top: "0vw", right: "0vw", padding: 0 }}>
                    <CloseIcon style={{ height: "auto", width: isMobile ? "6vw" : "1.8vw" }} />
                </IconButton>
            )}
        </Box>
    )
}
