import { IconButton, Box, TextField, Skeleton, Avatar, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { ReactComponent as CloseIcon } from "../../images/x.svg"
import { useDynamicImage } from "../../hooks/useDynamicImage"
import { useArray } from "burgos-array"
import { CurrencyText } from "../CurrencyText"

interface ProductProps {
    product: Product
    hideCloseButton?: boolean
}

export const Product: React.FC<ProductProps> = ({ product, hideCloseButton }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cart = useCart()
    const navigate = useNavigate()

    const productRef = useDynamicImage(product)

    const current_text_style = { color: "#686868", fontSize: isMobile ? "3.3vw" : "1rem" }

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
                gap: isMobile ? "3vw" : "1vw",
                overflow: "hidden",
                width: 1,
                minHeight: isMobile ? "15vw" : "fit-content",
            }}
            ref={productRef}
        >
            {product.cover ? (
                <Avatar
                    src={"data:image/jpeg;base64," + product.cover}
                    variant="rounded"
                    alt="product"
                    style={{ width: isMobile ? "12vw" : "5vw", height: isMobile ? "12vw" : "5vw" }}
                />
            ) : (
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: isMobile ? "12vw" : "5vw", height: isMobile ? "12vw" : "5vw", flexShrink: 0 }}
                />
            )}
            {product ? (
                <>
                    <Box
                        sx={{
                            color: "#363775",
                            fontWeight: "500",
                            fontSize: isMobile ? "3vw" : "1rem",
                            flexDirection: "column",
                            gap: isMobile ? "1.8vw" : "1vw",
                            overflow: "hidden",
                            width: 1,
                        }}
                    >
                        <Box sx={{ flexDirection: "column", width: 1 }}>
                            <Box sx={{ width: 1, overflow: "hidden" }}>
                                <Box sx={{ flexDirection: "column", width: 1, gap: isMobile ? "2vw" : "0.5vw" }}>
                                    <Box sx={{ width: "100%" }}>
                                        <div
                                            style={{
                                                width: "80%",
                                                fontSize: isMobile ? "3.5vw" : "1.2rem",
                                                fontWeight: "bold",
                                                // whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {product.name}
                                        </div>
                                    </Box>
                                    <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "0.5vw" }}>
                                        <p style={{ fontSize: isMobile ? "3.3vw" : "1rem" }}>Quantidade: {product.quantity} </p>
                                        <p style={{ fontSize: isMobile ? "3.3vw" : "1rem" }}>
                                            Preço unitário: <CurrencyText value={product.price} style={current_text_style} />
                                        </p>
                                        <p style={{ fontSize: isMobile ? "3.3vw" : "1rem" }}>
                                            Subtotal: <CurrencyText value={total} style={current_text_style} />
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {!hideCloseButton && (
                        <IconButton className="close" onClick={deleteProduct} sx={{ position: "absolute", top: "0vw", right: "0vw", padding: 0 }}>
                            <CloseIcon style={{ height: "auto", width: isMobile ? "6vw" : "1.8vw" }} />
                        </IconButton>
                    )}
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    sx={{
                        fontWeight: "500",
                        fontSize: isMobile ? "3vw" : "1rem",
                        flexDirection: "column",
                        gap: isMobile ? "1.8vw" : "1vw",
                        overflow: "hidden",
                        width: 1,
                        height: isMobile ? "20vw" : "5vw",
                        borderRadius: "2vw",
                    }}
                />
            )}
        </Box>
    )
}
