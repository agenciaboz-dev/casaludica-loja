import React, { useEffect, useState } from "react"
import { Box, Skeleton } from "@mui/material"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useUser } from "../../hooks/useUser"
import { LoginContainer } from "../../components/Menu/LoginContainer"
import { useApi } from "../../hooks/useApi"
import { useArray } from "burgos-array"
import { OrderComponent } from "../../components/OrderComponent"
import { Order } from "boz.pay.component"
import { useFranchise } from "../../hooks/useFranchise"

interface OrdersProps {}

const UserWrapper: React.FC<{ user: User }> = ({ user }) => {
    const api = useApi()
    const skeletons = useArray().newArray(3)

    const { franchise } = useFranchise()

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        api.order.get.user(user.id).then((response) => {
            setOrders(response.data.orders)
            console.log({ orders_response: response?.data.orders })
        })
    }, [franchise])

    return (
        <Box sx={{ flexDirection: "column", fontSize: "1.2rem", color: "primary.main", width: "100%", gap: "5vw", paddingBottom: "10vw" }}>
            {!!orders.length ? (
                <>
                    {orders
                        .sort((a, b) => b.id - a.id)
                        .map((order) => (
                            <Box key={order.id} sx={{ flexDirection: "column", width: "100%", color: "primary.main" }}>
                                <h3>Pedido #{order.referenceId}</h3>
                                <OrderComponent order={order} />
                            </Box>
                        ))}
                </>
            ) : (
                <>
                    {skeletons.map((index) => (
                        <Skeleton variant="rounded" animation="wave" key={index} sx={{ width: "100%", height: "100vw" }} />
                    ))}
                </>
            )}
        </Box>
    )
}

export const Orders: React.FC<OrdersProps> = ({}) => {
    const { user } = useUser()

    return (
        <DefaultWrapper>
            {user ? (
                <UserWrapper user={user} />
            ) : (
                <Box sx={{ flexDirection: "column", paddingBottom: "10vw" }}>
                    Entre para ver seus pedidos
                    <LoginContainer redirect="/orders" />
                </Box>
            )}
        </DefaultWrapper>
    )
}
