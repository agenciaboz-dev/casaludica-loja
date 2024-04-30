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
import { useMenu } from "../../hooks/useMenu"
import { DefaultWrapper } from "../DefaultWrapper"
import unmask from "../../tools/unmask"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { snackbar } = useSnackbar()
    const { franchise, currentAddress } = useFranchise()
    const { user } = useUser()
    const { confirm } = useConfirmDialog()
    const cart = useCart()
    const api_helper = useApi()
    const navigate = useNavigate()
    const menu = useMenu()

    const [payingOrderId, setPayingOrderId] = useState("")
    const [makingOrder, setMakingOrder] = useState(false)

    const initialValues: BillingForm = user
        ? { ...user, notes: "", company: user.company || "", complement: user.complement || "" }
        : {
              name: "",
              lastname: "",
              company: "",
              postcode: currentAddress?.cep || "",
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
                title: "Usuário Encontrado",
                content: "Já existe um cadastro com esses dados, deseja fazer login?",
                onConfirm: () => {
                    menu.setRenderForm("login")
                    menu.setHavePassword(false)
                    menu.setOpen(true)
                },
            })
            return true
        }

        return false
    }

    const billingFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (!franchise || makingOrder) return

            if (
                !Object.entries(values).every(([key, value]) => {
                    if (["company", "complement", "notes", "profilePicUrl"].includes(key)) return true
                    if (!value) {
                        console.log({ missing_key: key })
                        return false
                    }

                    return true
                })
            ) {
                snackbar({ severity: "warning", text: "preencha todos os dados obrigatórios" })

                return
            }

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
                postcode: unmask(values.postcode),
                district: values.district,
                number: values.number,
                state: values.state,
                complement: values.complement,
                cpf: unmask(values.cpf),

                products: cart.products.map((item) => ({ ...item, cover: "" })),
                total: cart.total,
                storeId: franchise.id,

                user_id: user_id,
            }
            console.log(data)

            if (user) {
                const user_entries = Object.entries(user)
                await Promise.all(
                    Object.entries(data).map(async ([key, value]) => {
                        const diff = user_entries.find(([user_key, user_value]) => user_key == key && user_value != value)
                        if (diff) {
                            const data: Partial<User> = { id: user.id, [key]: value }
                            console.log(data)
                            await api.post("/user/update", data)
                        }
                    })
                )
            }

            api_helper.order.new({
                data,
                callback: (response) => {
                    console.log(response.data)
                    setPayingOrderId(response.data.order.id)
                },
            })
        },
    })

    useEffect(() => {
        if (!cart.products.length && !makingOrder) {
            navigate("/")
        }
    }, [cart.products])

    return (
        <DefaultWrapper>
            <p
                className="finish"
                style={{
                    fontSize: isMobile ? "5vw" : "2vw",
                    color: "#363775",
                    fontFamily: "BowlbyOneSC",
                }}
            >
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
                    gap: isMobile ? "10vw" : "3vw",
                }}
            >
                {cart.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
            <Box sx={{ flexDirection: isMobile ? "column" : "row-reverse", gap: isMobile ? "5vw" : "3vw" }}>
                <Review handleSubmit={billingFormik.handleSubmit} makingOrder={makingOrder} />
                <Billing formik={billingFormik} makingOrder={makingOrder} />
                <PayModal open={!!payingOrderId} close={() => setPayingOrderId("")} orderId={payingOrderId} />
            </Box>
        </DefaultWrapper>
    )
}
