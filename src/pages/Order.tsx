import React, { useEffect, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Order as BozpayOrder } from "boz.pay.component"
import { useApi } from "../hooks/useApi"
import { useFranchise } from "../hooks/useFranchise"
import { Background } from "../components/Background"
import { Header } from "../components/Header"
import { SearchField } from "../components/SearchField"
import { OrderComponent } from "../components/OrderComponent"

interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const orderId = useParams().id
    const api = useApi()
    const navigate = useNavigate()

    const { bozpayStoreIdentifier } = useFranchise()

    const [order, setOrder] = useState<BozpayOrder>()

    useEffect(() => {
        if (!orderId) {
            navigate("/")
        } else {
            api.order.get(bozpayStoreIdentifier, orderId, {
                callback: (response) => {
                    console.log(response.data)
                    setOrder(response.data)
                },
            })
        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                flexDirection: "column",
                gap: "5vw",
                padding: "0 5vw",
            }}
        >
            <Background />
            <Header />
            <SearchField />

            <h2 style={{ color: "white", fontSize: "2rem" }}>Seu pedido: #{order?.referenceId}</h2>

            {order ? (
                <OrderComponent order={order} />
            ) : (
                <Box sx={{ padding: "5vw" }}>
                    <Skeleton variant="rounded" animation="wave" sx={{ width: "90vw", height: "50vw" }} />
                </Box>
            )}
        </Box>
    )
}
