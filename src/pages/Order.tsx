import React, { useEffect, useState } from "react"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Order as BozpayOrder } from "boz.pay.component"
import { useApi } from "../hooks/useApi"
import { useFranchise } from "../hooks/useFranchise"
import { OrderComponent } from "../components/OrderComponent"
import { DefaultWrapper } from "../components/DefaultWrapper"

interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const orderId = useParams().id
    const api = useApi()
    const navigate = useNavigate()

    const { bozpayStoreIdentifier } = useFranchise()

    const [order, setOrder] = useState<BozpayOrder>()

    useEffect(() => {
        if (!orderId) {
            navigate("/")
        } else {
            api.order.get.id(bozpayStoreIdentifier, orderId, {
                callback: (response) => {
                    console.log(response.data)
                    setOrder(response.data)
                },
            })
        }
    }, [])

    return (
        <DefaultWrapper>
            <Box sx={{ flexDirection: "column", paddingBottom: isMobile ? "10vw" : "5vw", gap: isMobile ? "5vw" : "1vw" }}>
                <Box sx={{ fontSize: "1rem", color: "primary.main" }}>
                    <h2>Seu pedido: #{order?.referenceId}</h2>
                </Box>
                {order ? (
                    <OrderComponent order={order} />
                ) : (
                    <Box>
                        <Skeleton variant="rounded" animation="wave" sx={{ width: "90vw", height: "50vw" }} />
                    </Box>
                )}
            </Box>
        </DefaultWrapper>
    )
}
