import { IconButton, Box, TextField, Skeleton, Avatar } from "@mui/material"
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
        <Box sx={{ position: "relative", justifyContent: "center", alignItems: "center", gap: "3vw" }} ref={productRef}>
            {product.cover ? (
                <Avatar src={"data:image/jpeg;base64," + product.cover} variant="rounded" alt="product" style={{ width: "37vw", height: "37vw" }} />
            ) : (
                <Skeleton variant="rounded" animation="wave" sx={{ width: "37vw", height: "37vw", flexShrink: 0 }} />
            )}
            <Box sx={{ color: "#363775", fontWeight: "500", fontSize: "3vw", flexDirection: "column", gap: "1.8vw" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <p style={{ fontSize: "3.2vw" }}>
                        Produto: <span style={{ fontWeight: "bold" }}>{product.name}</span>
                    </p>
                    <Box sx={{ flexDirection: "row", gap: "1vw", alignItems: "center" }}>
                        <p style={{ fontSize: "3.2vw" }}>Quantidade: {product.quantity} </p>
                    </Box>
                </Box>
                <p style={{ fontSize: "3.5vw" }}>
                    Preço unitário: <span style={{ color: "#686868", fontWeight: "bolder", fontSize: "3.8vw" }}>R${product.price.toFixed(2)}</span>
                </p>
            </Box>
            {!hideCloseButton && (
                <IconButton className="close" onClick={deleteProduct} sx={{ position: "absolute", top: "0vw", right: "0vw", padding: 0 }}>
                    <CloseIcon style={{ height: "auto", width: "6vw" }} />
                </IconButton>
            )}
        </Box>
    )
}
