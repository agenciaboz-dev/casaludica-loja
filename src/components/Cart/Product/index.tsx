import React from "react"
import { Avatar, Box } from "@mui/material"
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
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
                padding: "5vw",
                borderRadius: "10vw",
                flexDirection: "column",
                height: "fit-content",
                gap: "3vw",
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
                    sx={{ bgcolor: colors.primary, width: "32vw", height: "32vw", borderRadius: "5vw" }}
                >
                    <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
                </Avatar>
                <Box
                    className="right-container"
                    style={{
                        gap: "3vw",
                    }}
                >
                    <Box
                        className="quantity-container"
                        style={{
                            flexDirection: "column",
                            gap: "2vw",
                        }}
                    >
                        <UpIcon onClick={() => increase()} />
                        <Box
                            className="quantity"
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.secondary,
                                fontSize: "7vw",
                                fontWeight: "bold",
                                padding: "2vw",
                            }}
                        >
                            {product.quantity}
                        </Box>
                        <DownIcon onClick={() => decrease()} />
                    </Box>
                    <RemoveIcon onClick={() => remove()} style={{ alignSelf: "flex-start" }} />
                </Box>
            </Box>
            <Box
                className="bottom-container"
                style={{
                    gap: "5vw",
                }}
            >
                <Box
                    className="quantity-container"
                    style={{
                        borderRadius: "100%",
                        backgroundColor: colors.secondary,
                        width: "10vw",
                        height: "10vw",
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
