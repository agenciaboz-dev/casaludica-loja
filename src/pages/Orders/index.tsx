import React, { useEffect, useState } from "react"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useUser } from "../../hooks/useUser"
import { LoginContainer } from "../../components/Menu/LoginContainer"
import { useApi } from "../../hooks/useApi"
import { useArray } from "burgos-array"
import { OrderComponent } from "../../components/OrderComponent"
import { Order } from "boz.pay.component"
import { useFranchise } from "../../hooks/useFranchise"
import { useMenu } from "../../hooks/useMenu"

interface OrdersProps {}

const UserWrapper: React.FC<{ user: User }> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const skeletons = useArray().newArray(3)

    const { franchise } = useFranchise()

    const [orders, setOrders] = useState<Order[]>([])
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        api.order.get.user(user.id).then((response) => {
            setOrders(response.data.orders)
            console.log({ orders_response: response?.data.orders })
            if (response.data.orders.length == 0) setEmpty(true)
        })
    }, [franchise])

    return (
        <Box
            sx={{
                flexDirection: "column",
                fontSize: "1.2rem",
                color: "primary.main",
                width: "100%",
                gap: isMobile ? "5vw" : "2vw",
                paddingBottom: isMobile ? "10vw" : "5vw",
            }}
        >
            {empty ? (
                <h3 style={{ textAlign: "center" }}>Nenhum pedido encontrado</h3>
            ) : !!orders.length ? (
                <>
                    {orders
                        .sort((a, b) => b.id - a.id)
                        .map((order) => (
                            <OrderComponent order={order} viewOrder key={order.id} />
                        ))}
                </>
            ) : (
                <>
                    {skeletons.map((index) => (
                        <Skeleton variant="rounded" animation="wave" key={index} sx={{ width: "100%", height: isMobile ? "100vw" : "50vw" }} />
                    ))}
                </>
            )}
        </Box>
    )
}

export const Orders: React.FC<OrdersProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const menu = useMenu()
    const { user } = useUser()

    useEffect(() => {
        if (!user) {
            menu.setRenderForm("login")
            menu.setOpen(true)
        }
    }, [])

    return (
        <DefaultWrapper>
            {user ? (
                <UserWrapper user={user} />
            ) : (
                <Box sx={{ flexDirection: "column", paddingBottom: isMobile ? "10vw" : "5vw", gap: isMobile ? "5vw" : "1vw" }}>
                    <p style={{ fontFamily: "BowlbyOneSC" }}>Faça login para visualizar seus pedidos.</p>
                </Box>
            )}
        </DefaultWrapper>
    )
}
