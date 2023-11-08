import React, { useState } from "react"
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
import { useSnackbar } from "burgos-snackbar"
import { PayModal } from "../PayModal"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const cart = useCart()

    const [paying, setPaying] = useState(false)

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
            const data = {
                billing: values,
                products: cart.products,
                total: cart.total,
            }
            console.log(data)
            setPaying(true)
            // snackbar({
            //     severity: "info",
            //     text: "vai abrir o boz pay agora, depois do pagamento vai trazer de volta pra cá com uma tela de status do pedido?",
            // })
        },
    })

    const handleSubmit = () => {
        const values = billingFormik.values
        if (!values.name || !values.lastname || !values.address || !values.city || !values.email || !values.phone || !values.postalcode) {
            snackbar({ severity: "error", text: "Preencha os campos obrigatórios" })
            return
        }

        billingFormik.handleSubmit()
    }

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
                    paddingBottom: "4vw",
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
            <Review />
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
            <ButtonComponent onClick={handleSubmit}>Pagar</ButtonComponent>

            <PayModal open={paying} setOpen={setPaying} orderId="" />
        </Box>
    )
}
