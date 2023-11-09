import React from "react"
import { Box } from "@mui/material"
import { Order } from "boz.pay.component"
import { CurrencyText } from "./CurrencyText"
import { Product } from "./Checkout/Product"
import { PendingPayment } from "./PendingPayment"

interface OrderComponentProps {
    order: Order
}

interface DataTextProps {
    title: string
    value: React.ReactNode
}

const DataText: React.FC<DataTextProps> = ({ title, value }) => {
    return (
        <Box sx={{ gap: "5vw", fontSize: "1.3rem", alignItems: "center", color: "primary.main", fontFamily: "BowlbyOneSC" }}>
            {title}
            <Box sx={{ fontSize: "1rem", fontFamily: "BowlbyOneSC" }}>{value}</Box>
        </Box>
    )
}

const RealText: React.FC<{ value: string | number }> = ({ value }) => (
    <CurrencyText value={value} style={{ fontSize: "1rem", fontFamily: "BowlbyOneSC" }} />
)

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }) => {
    const subtotal = order.products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    const freight = order.total - subtotal

    return (
        <Box sx={{ flexDirection: "column", padding: "5vw" }}>
            {order.status == "PENDING" && <PendingPayment orderId={order.id.toString()} />}
            <DataText title="Id: " value={order.referenceId} />
            <DataText title="Status: " value={order.status} />
            <DataText title="Data: " value={new Date(Number(order.dateCreated)).toLocaleDateString("pt-br")} />
            <DataText title="Sub total: " value={<RealText value={subtotal} />} />
            <DataText title="Frete: " value={<RealText value={freight} />} />
            <DataText title="Total: " value={<RealText value={order.total} />} />
            <Box sx={{ flexDirection: "column", gap: "1vw", fontFamily: "BowlbyOneSC", color: "primary.main", fontSize: "1.3rem" }}>
                Produtos: ({order.products.length})
                {order.products.map((item) => (
                    // é o mesmo componente usado no checkout, cuidado ao editar
                    <Product key={item.id} product={{ ...item, cover: "", sold: 0, id: Number(item.referenceId) }} hideCloseButton />
                ))}
            </Box>
        </Box>
    )
}
