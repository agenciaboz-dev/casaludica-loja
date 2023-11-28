import React, { useEffect, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Order as BozpayOrder } from "boz.pay.component"
import { useApi } from "../hooks/useApi"
import { useFranchise } from "../hooks/useFranchise"
import { OrderComponent } from "../components/OrderComponent"
import { DefaultWrapper } from "../components/DefaultWrapper"

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
        <DefaultWrapper>
            <h2 style={{ color: "white", fontSize: "2rem" }}>Seu pedido: #{order?.referenceId}</h2>

            {order ? (
                <OrderComponent order={order} />
            ) : (
                <Box sx={{ padding: "5vw" }}>
                    <Skeleton variant="rounded" animation="wave" sx={{ width: "90vw", height: "50vw" }} />
                </Box>
            )}
        </DefaultWrapper>
    )
}
