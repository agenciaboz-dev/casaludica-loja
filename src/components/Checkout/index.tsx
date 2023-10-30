import React from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../../pages/Home/Collections"
import { Product } from "./Product"
import { Box } from "@mui/material"
//import "./style.scss"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const cart = useCart()

    return (
        <Box className="Checkout-Component" sx={{ flexDirection: "column", width: "100%", padding: "0 5vw", gap: "5vw" }}>
            <Background />
            <Header />
            <SearchField />
            <Collections />

            <p className="finish" style={{ fontWeight: "bold", fontSize: "5vw", color: "#363775" }}>
                Finalizar Pedido
            </p>
            <Box
                className="order"
                sx={{
                    width: "100%",
                    boxShadow: " 0 0 8px rgba(0,0,0,0.4)",
                    padding: "5vw",
                    borderRadius: "4.5vw",
                    flexDirection: "column",
                    height: "fit-content",
                    gap: "3vw",
                }}
            >
                {cart.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
        </Box>
    )
}