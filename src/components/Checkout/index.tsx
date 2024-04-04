import React, { useEffect, useState } from "react"
import { Background } from "../../components/Background"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../../pages/Home/Collections"
import { Product } from "./Product"
import { Box, CircularProgress, Grid, TextField, useMediaQuery } from "@mui/material"
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
import { api } from "../../api"
import { useConfirmDialog } from "burgos-confirm"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { franchise, currentAddress } = useFranchise()
    const { user } = useUser()
    const { confirm } = useConfirmDialog()
    const cart = useCart()
    const api_helper = useApi()
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

    const findUser = async (cpf: string, email: string) => {
        const response = await api.post("/user/find", { cpf, email })
        console.log({ response_data: response.data })
        const user_id = response.data as number
        if (user_id) {
            confirm({
                title: "usuário encontrado",
                content: "já existe um usuário cadastro com esses dados, deseja fazer login?",
                onConfirm: () => {
                    navigate("/login", { state: { redirect: "/checkout" } })
                },
            })
            return true
        }

        return false
    }

    const billingFormik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (!franchise) return
            setMakingOrder(true)
            const user_id = user?.id

            if (!user_id) {
                const user_exists = await findUser(values.cpf, values.email)

                if (user_exists) {
                    setMakingOrder(false)
                    return
                }
            }

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
                storeId: franchise.id,

                user_id: user_id,
            }
            console.log(data)
            api_helper.order.new({
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
        <Box className="Checkout-Component" sx={{ flexDirection: "column", width: "100vw", padding: "0 5vw", gap: "5vw", paddingBottom: "5vw" }}>
            <Background />
            <Header />
            <SearchField />
            <Collections />
            <p className="finish" style={{ fontWeight: "bold", fontSize: isMobile ? "5vw" : "3vw", color: "#363775", fontFamily: "BowlbyOneSC" }}>
                Finalizar Pedido
            </p>
            <Box
                className="order"
                sx={{
                    width: "100%",
                    boxShadow: " 0 0 8px rgba(0,0,0,0.4)",
                    padding: isMobile ? "5vw" : "2vw",
                    // paddingBottom: isMobile ? "4vw" : "1.8vw",
                    borderRadius: isMobile ? "4.5vw" : "2vw",
                    flexDirection: "column",
                    height: "fit-content",

                    gap: "3vw",
                }}
            >
                {cart.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
            {/* <Box sx={{ flexDirection: isMobile ? "column" : "row" }}> */}
            <Review />
            <Billing formik={billingFormik} />
            <ButtonComponent onClick={handleSubmit}>{makingOrder ? <CircularProgress size="1.5rem" color="secondary" /> : "Pagar"}</ButtonComponent>
            {/* </Box> */}
            <PayModal open={!!payingOrderId} close={() => setPayingOrderId("")} orderId={payingOrderId} />
        </Box>
    )
}
