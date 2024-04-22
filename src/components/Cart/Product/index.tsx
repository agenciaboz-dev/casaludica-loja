import React from "react"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"
import { useColors } from "../../../hooks/useColors"
import { ReactComponent as UpIcon } from "../../../images/quantity-increase.svg"
import { ReactComponent as DownIcon } from "../../../images/quantity-decrease.svg"
import { ReactComponent as RemoveIcon } from "../../../images/remove_product.svg"
import { CurrencyText } from "../../CurrencyText"
import { useCart } from "../../../hooks/useCart"
// import './style.scss'

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const cart = useCart()

    const remove = () => {
        cart.remove(product)
    }

    const increase = () => {
        cart.quantity(product, 1)
    }

    const decrease = () => {
        cart.quantity(product, -1)
    }

    return (
        <Box
            className="Product-Component"
            style={{
                width: "100%",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
                padding: isMobile ? "5vw" : "1vw",
                borderRadius: isMobile ? "5vw" : "1vw",
                flexDirection: "column",
                height: "fit-content",
                gap: isMobile ? "3vw" : "1vw",
                position: "relative",
            }}
        >
            <Box
                className="top-container"
                style={{
                    justifyContent: "start",
                    alignItems: "center",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                <Box
                    className="quantity-container"
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        gap: isMobile ? "2vw" : "1vw",
                    }}
                >
                    <UpIcon
                        onClick={() => increase()}
                        style={{
                            cursor: "pointer",
                        }}
                    />
                    <Box
                        className="quantity"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "lightgrey",
                            fontSize: isMobile ? "7vw" : "2rem",
                            fontWeight: "bold",
                            padding: isMobile ? "2vw" : "1vw",
                            minWidth: isMobile ? "10vw" : "3.5vw",
                            minHeight: isMobile ? "10vw" : "3.5vw",
                        }}
                    >
                        {product.quantity}
                    </Box>
                    <DownIcon
                        onClick={() => decrease()}
                        style={{
                            cursor: "pointer",
                        }}
                    />
                </Box>
                <Avatar
                    src={"data:image/jpeg;base64," + product.cover}
                    variant={"rounded"}
                    sx={{ bgcolor: colors.primary, width: isMobile ? "32vw" : "10vw", height: isMobile ? "32vw" : "10vw", borderRadius: "1vw" }}
                >
                    <ImageIcon sx={{ width: "auto", height: "auto" }} />
                </Avatar>
                <RemoveIcon
                    onClick={() => remove()}
                    style={{ cursor: "pointer", position: "absolute", top: isMobile ? "5vw" : "1vw", right: isMobile ? "5vw" : "1vw" }}
                />
            </Box>
            <Box
                className="bottom-container"
                style={{
                    gap: isMobile ? "5vw" : "2vw",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    className="quantity-container"
                    style={{
                        borderRadius: "50%",
                        backgroundColor: "lightgrey",
                        padding: isMobile ? "2vw" : "1vw",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        aspectRatio: 1,
                        minWidth: isMobile ? "10vw" : "3.5vw",
                        minHeight: isMobile ? "10vw" : "3.5vw",
                        height: "auto",
                    }}
                >
                    x{product.quantity}
                </Box>
                <Box
                    className="name-price"
                    style={{
                        flexDirection: "column",
                    }}
                >
                    <p className="name" style={{ fontFamily: "BowlbyOneSC" }}>
                        {product.name}
                    </p>
                    <CurrencyText value={product.price * product.quantity} color={"#686868"} style={{ fontFamily: "BowlbyOneSC" }} />
                </Box>
            </Box>
        </Box>
    )
}
