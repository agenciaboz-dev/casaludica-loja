import React from "react"
import { Avatar, Box, useMediaQuery } from "@mui/material"
import BrokenImageIcon from "@mui/icons-material/BrokenImage"
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
                borderRadius: isMobile ? "10vw" : "1vw",
                flexDirection: "column",
                height: "fit-content",
                gap: isMobile ? "3vw" : "1vw",
            }}
        >
            <Box
                className="top-container"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={"data:image/jpeg;base64," + product.cover}
                    variant={"rounded"}
                    sx={{ bgcolor: colors.primary, width: isMobile ? "32vw" : "10vw", height: isMobile ? "32vw" : "10vw", borderRadius: "1vw" }}
                >
                    <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
                </Avatar>
                <Box
                    className="right-container"
                    style={{
                        gap: isMobile ? "3vw" : "1vw",
                    }}
                >
                    <Box
                        className="quantity-container"
                        style={{
                            flexDirection: "column",
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
                                padding: isMobile ? "2vw" : 0,
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
                    <RemoveIcon onClick={() => remove()} style={{ alignSelf: "flex-start", cursor: "pointer" }} />
                </Box>
            </Box>
            <Box
                className="bottom-container"
                style={{
                    gap: isMobile ? "5vw" : "2vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    className="quantity-container"
                    style={{
                        borderRadius: "50%",
                        backgroundColor: "lightgrey",
                        width: isMobile ? "10vw" : "3vw",
                        height: isMobile ? "10vw" : "3vw",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
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
                    <h3
                        className="name"
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        {product.name}
                    </h3>
                    <CurrencyText value={product.price * product.quantity} />
                </Box>
            </Box>
        </Box>
    )
}
