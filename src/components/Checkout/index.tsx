import React, { useEffect, useState } from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../../pages/Home/Collections"
import { Product } from "./Product"
import { Box, CircularProgress, TextField } from "@mui/material"
import { ButtonComponent } from "../ButtonComponent"
import { Billing } from "./Billing"
import { useFormik } from "formik"
import { Review } from "./Review"
import { useSnackbar } from "burgos-snackbar"
import { PayModal } from "../PayModal"
import { useFranchise } from "../../hooks/useFranchise"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const { franchise_id: franchise, currentAddress } = useFranchise()
    const { user } = useUser()
    const cart = useCart()
    const api = useApi()
    const navigate = useNavigate()

    const [payingOrderId, setPayingOrderId] = useState("")
    const [makingOrder, setMakingOrder] = useState(false)

    const initialValues: BillingForm = user
        ? { ...user, postalcode: user.postcode, notes: "", company: user.company || "", complement: user.complement || "" }
        : {
              name: "",
              lastname: "",
              company: "",
              postalcode: currentAddress?.cep || "",
              address: currentAddress?.logradouro || "",
              city: currentAddress?.localidade || "",
              phone: "",
              email: "",
              notes: "",
              district: currentAddress?.bairro || "",
              number: "",
              state: currentAddress?.uf || "",
              complement: currentAddress?.complemento || "",
              cpf: "",
          }

    const billingFormik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const data: OrderForm = {
                address: values.address,
                city: values.city,
                company: values.company,
                email: values.email,
                lastname: values.lastname,
                name: values.name,
                notes: values.notes,
                phone: values.phone,
                postcode: values.postalcode,
                district: values.district,
                number: values.number,
                state: values.state,
                complement: values.complement,
                cpf: values.cpf,

                products: cart.products.map((item) => ({ ...item, cover: "" })),
                total: cart.total,
                storeId: franchise,

                user_id: user?.id,
            }
            console.log(data)
            setMakingOrder(true)
            api.order.new({
                data,
                callback: (response) => {
                    setMakingOrder(false)
                    console.log(response.data)
                    setPayingOrderId(response.data.order.id)
                },
            })
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

    useEffect(() => {
        if (!cart.products.length) {
            navigate("/")
        }
    }, [])

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
            <Billing formik={billingFormik} />
            <ButtonComponent onClick={handleSubmit}>{makingOrder ? <CircularProgress size="1.5rem" color="secondary" /> : "Pagar"}</ButtonComponent>

            <PayModal open={!!payingOrderId} close={() => setPayingOrderId("")} orderId={payingOrderId} />
        </Box>
    )
}
