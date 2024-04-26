import { Avatar, IconButton, Box, Skeleton, MenuItem, useMediaQuery } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { CurrencyText } from "../../../../components/CurrencyText"
import { useCart } from "../../../../hooks/useCart"
import { useColors } from "../../../../hooks/useColors"
import { ReactComponent as CartIcon } from "../../../../images/cart.svg"
import { useDynamicImage } from "../../../../hooks/useDynamicImage"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cart = useCart()
    const colors = useColors()
    const navigate = useNavigate()

    const productRef = useDynamicImage(product)

    return (
        <Box
            ref={productRef}
            style={{ backgroundImage: `url(data:image/jpeg;base64,${product.cover})` }}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
                borderRadius: isMobile ? "1vw" : "0.5vw",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
                // flexShrink: "0",
                width: isMobile ? "40vw" : "100%",
                height: isMobile ? "50vw" : "15vw",
                backgroundColor: "white",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // backgroundPosition: "center",
                padding: isMobile ? "2vw" : "0.5vw",
                pb: isMobile ? "" : "1vw",
                cursor: "pointer",
            }}
        >
            {/* <Avatar src={product.cover} sx={{width: '30vw', height: '30vw'}} /> */}
            {product.cover ? (
                <Box
                    className="container"
                    sx={{
                        justifyContent: "space-between",
                        marginTop: "auto",
                        backgroundColor: "white",
                        padding: isMobile ? "3vw" : "0.5vw",
                        borderRadius: isMobile ? "2vw" : "0.5vw",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
                        alignItems: "center",
                        width: "100%",
                        gap: isMobile ? "0" : "0.5vw",
                    }}
                >
                    <Box
                        className="text"
                        sx={{ flexDirection: "column", fontSize: isMobile ? "3.5vw" : "1rem", fontWeight: "bold", gap: isMobile ? "2vw" : "0" }}
                    >
                        <p
                            className="name"
                            style={{
                                whiteSpace: "nowrap",
                                width: isMobile ? "20vw" : "8vw",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: isMobile ? "" : "0.8rem",
                            }}
                        >
                            {product.name}
                        </p>
                        <CurrencyText value={product.price} color={colors.pink} />
                    </Box>
                    <IconButton
                        sx={{ backgroundColor: colors.primary, width: isMobile ? "9vw" : "2.3rem", height: isMobile ? "9vw" : "2.3rem" }}
                        onClick={() => cart.add(product)}
                        disabled={product.stock == 0}
                    >
                        <CartIcon />
                    </IconButton>
                </Box>
            ) : (
                <Skeleton variant="rounded" width={isMobile ? "35vw" : "12vw"} height={isMobile ? "45vw" : "100%"} animation="wave" />
            )}
        </Box>
    )
}
