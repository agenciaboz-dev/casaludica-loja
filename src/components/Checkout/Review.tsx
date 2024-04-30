import React from "react"
import { Box, CircularProgress, Grid, Paper, useMediaQuery } from "@mui/material"
import { useCart } from "../../hooks/useCart"
import { CurrencyText } from "../CurrencyText"
import { ButtonComponent } from "../ButtonComponent"

interface ReviewProps {
    handleSubmit: () => void
    makingOrder: boolean
}

export const Review: React.FC<ReviewProps> = ({ handleSubmit, makingOrder }) => {
    const cart = useCart()
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box sx={{ flexDirection: "column", color: "primary.main", gap: isMobile ? "5vw" : "2vw", width: isMobile ? "100%" : "50%" }}>
            <p style={{ fontFamily: "BowlbyOneSC", fontSize: isMobile ? "5vw" : "2vw" }}>Detalhes do Pedido</p>
            <Paper
                elevation={5}
                sx={{
                    flexDirection: "column",
                    borderRadius: isMobile ? "4.5vw" : "2vw",
                    gap: isMobile ? "5vw" : "1vw",
                    padding: isMobile ? "6vw" : "2vw",
                    color: "#686868",
                }}
            >
                <Grid container spacing={6} justifyContent="space-between">
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Produtos</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Subtotal</p>
                    </Grid>
                </Grid>
                {cart.products.map((product) => (
                    <Grid container spacing={6} key={product.id}>
                        <Grid item xs={6}>
                            <p>{product.name}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <CurrencyText value={product.price * product.quantity} />
                        </Grid>
                    </Grid>
                ))}
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Subtotal</p>
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyText value={cart.total} style={{ fontWeight: "bold" }} />
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: "1px solid", borderColor: "primary.main", color: "black", paddingTop: isMobile ? "5vw" : "2vw" }}>
                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <p style={{ fontWeight: "bold" }}>Total</p>
                        </Grid>
                        <Grid item xs={6}>
                            <CurrencyText value={cart.total} style={{ fontWeight: "bold" }} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            {!isMobile && (
                <ButtonComponent onClick={() => handleSubmit()}>
                    {makingOrder ? <CircularProgress size="1.5rem" color="secondary" /> : "Pagar"}
                </ButtonComponent>
            )}
        </Box>
    )
}
