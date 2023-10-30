import React from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../../pages/Home/Collections"
import { Product } from "./Product"
import { Box, TextField } from "@mui/material"
import { ButtonComponent } from "../ButtonComponent"
import { Billing } from "./Billing"
import { useFormik } from "formik"
import { Review } from "./Review"
//import "./style.scss"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const cart = useCart()

    const initialValues: BillingForm = {
        name: "",
        lastname: "",
        company: "",
        postalcode: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        notes: "",
    }
    const billingFormik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)
        },
    })

    return (
        <Box className="Checkout-Component" sx={{ flexDirection: "column", width: "100%", padding: "0 5vw", gap: "5vw", paddingBottom: "5vw" }}>
            <Background />
            <Header />
            <SearchField />
            <Collections />

            <p className="finish" style={{ fontWeight: "bold", fontSize: "5vw", color: "#363775", fontFamily: "BowlbyOneSC" }}>
                Finalizar Pedido
            </p>
            <Box
                className="order"
                sx={{
                    width: "100%",
                    boxShadow: " 0 0 8px rgba(0,0,0,0.4)",
                    padding: "5vw",
                    paddingBottom: "2vw",
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
            <Box
                className="order"
                sx={{
                    width: "100%",
                    boxShadow: " 0 0 8px rgba(0,0,0,0.4)",
                    padding: "5vw",
                    paddingBottom: "2vw",
                    borderRadius: "4.5vw",
                    flexDirection: "column",
                    height: "fit-content",
                    gap: "3vw",
                }}
            >
                <Box className="order" sx={{ flexDirection: "column", width: "100%", padding: "1vw 0vw", gap: "3vw" }}>
                    <TextField label="Código do cupom" InputProps={{ sx: { bgcolor: "#F0EEEE" } }} />
                    <ButtonComponent sx={{ width: "100%" }}>Aplicar cupom</ButtonComponent>
                </Box>
            </Box>

            <Billing formik={billingFormik} />

            <Review />
        </Box>
    )
}
