import { Box, SwipeableDrawer, useMediaQuery } from "@mui/material"
import React from "react"
import { ReactComponent as CartIcon } from "../../images/cart.svg"
import { useCart } from "../../hooks/useCart"
import { CurrencyText } from "../CurrencyText"
import { Product } from "./Product"
import { useColors } from "../../hooks/useColors"
// import './style.scss';
import { ButtonComponent } from "../ButtonComponent"
import { useNavigate } from "react-router-dom"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const cart = useCart()
    const navigate = useNavigate()

    const closeMenu = () => {
        cart.setOpen(false)
    }

    const finishOrder = () => {
        navigate("/checkout")
        closeMenu()
    }
    return (
        <SwipeableDrawer
            onOpen={() => cart.setOpen(true)}
            anchor={"right"}
            open={cart.open}
            onClose={closeMenu}
            PaperProps={{ className: "Cart-Component", style: { width: isMobile ? "80vw" : "25vw" } }}
        >
            <Box
                className="info"
                style={{
                    backgroundColor: colors.primary,
                    padding: isMobile ? "10vw" : "2vw 1vw",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <CartIcon />
                <Box
                    className="text"
                    style={{
                        flexDirection: "column",
                        color: "white",
                    }}
                >
                    <h3 style={{ fontSize: isMobile ? "4vw" : "1.5rem" }}>SEU CARRINHO</h3>
                    <p className="total" style={{ fontSize: isMobile ? "3vw" : "1rem" }}>
                        Valor total: {<CurrencyText value={cart.total} />}
                    </p>
                </Box>
                <Box
                    className="amount-circle"
                    style={{
                        borderRadius: "100%",
                        backgroundColor: colors.secondary,
                        width: isMobile ? "10vw" : "2vw",
                        height: isMobile ? "10vw" : "2vw",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h3>{cart.products?.length || 0}</h3>
                </Box>
            </Box>
            <Box
                className="product-list"
                style={{
                    flexDirection: "column",
                    gap: isMobile ? "5vw" : "2vw",
                    overflowY: "auto",
                    height: "80vh",
                    padding: isMobile ? "5vw" : "2vw",
                }}
            >
                {cart.products?.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
            <Box
                className="button-container"
                style={{
                    width: "100%",
                    padding: isMobile ? "5vw 3vw" : "1vw",
                    borderTopRightRadius: isMobile ? "10vw" : "2vw",
                    borderTopLeftRadius: isMobile ? "10vw" : "2vw",
                    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                }}
            >
                <ButtonComponent
                    style={{ width: "100%", fontSize: isMobile ? "4vw" : "1.5rem", textTransform: "unset" }}
                    title="Finalizar compra"
                    onClick={() => finishOrder()}
                    disabled={cart.products.length == 0}
                >
                    Finalizar compra
                </ButtonComponent>
            </Box>
        </SwipeableDrawer>
    )
}
