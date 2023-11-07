import React from "react"
import { Box, Grid, Paper } from "@mui/material"
import { useCart } from "../../hooks/useCart"
import { CurrencyText } from "../CurrencyText"

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
    const cart = useCart()

    return (
        <Box sx={{ flexDirection: "column", color: "primary.main", gap: "5vw" }}>
            <Paper elevation={5} sx={{ flexDirection: "column", borderRadius: "4.5vw", gap: "5vw", padding: "3vw", color: "#686868" }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Produtos</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Subtotal</p>
                    </Grid>
                </Grid>
                {cart.products.map((product) => (
                    <Grid container spacing={1.5} key={product.id}>
                        <Grid item xs={6}>
                            <p>{product.name}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <CurrencyText value={product.price * product.quantity} />
                        </Grid>
                    </Grid>
                ))}
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <p style={{ fontWeight: "bold" }}>Subtotal</p>
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyText value={cart.total} style={{ fontWeight: "bold" }} />
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: "1px solid", borderColor: "primary.main", color: "black", paddingTop: "5vw" }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <p style={{ fontWeight: "bold" }}>Total</p>
                        </Grid>
                        <Grid item xs={6}>
                            <CurrencyText value={cart.total} style={{ fontWeight: "bold" }} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}
