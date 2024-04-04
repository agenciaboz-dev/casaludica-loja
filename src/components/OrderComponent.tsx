import React from "react"
import { AlertColor, Box, SxProps } from "@mui/material"
import { Order } from "boz.pay.component"
import { CurrencyText } from "./CurrencyText"
import { Product } from "./Checkout/Product"
import { PendingPayment } from "./PendingPayment"
import statusEnum from "../tools/enumStatus"

interface OrderComponentProps {
    order: Order
}

interface DataTextProps {
    title: string
    value: React.ReactNode
    color?: AlertColor
    bold?: boolean
}

const DataText: React.FC<DataTextProps> = ({ title, value, color, bold }) => {
    return (
        <Box
            sx={{
                gap: "5vw",
                fontSize: "4vw",
                alignItems: "center",
                padding: "1vw",
                color: "primary.main",
                fontFamily: "BowlbyOneSC",
                justifyContent: "space-between",
                fontWeight: bold ? "bold" : ""
            }}>
            {title}
            <Box sx={{ textAlign: "flex-end", fontSize: "1rem", color: `${color}.main`, fontWeight: bold ? "bold" : "" }}>{value}</Box>
        </Box>
    )
}

const RealText: React.FC<{ value: string | number }> = ({ value }) => <CurrencyText value={value} style={{ fontSize: "1rem" }} />

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }) => {
    const subtotal = order.products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    const freight = order.total - subtotal
    const status = statusEnum(order.status)

    return (
        <Box sx={{ flexDirection: "column", gap: "5vw" }}>
            {order.status == "PENDING" && <PendingPayment orderId={order.referenceId} />}

            <Box
                sx={{
                    flexDirection: "column",
                    padding: "5vw",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    borderRadius: "2vw",
                }}
            >
                <DataText title="Status: " value={status.text} color={status.color} bold />
                <DataText title="Data: " value={new Date(Number(order.dateCreated)).toLocaleDateString("pt-br")} />

                <DataText title="Frete: " value={<RealText value={freight} />} />
                <DataText title="Sub-Total: " value={<RealText value={subtotal} />} />
                <DataText title="Total: " value={<RealText value={order.total} />} />
            </Box>
            <Box sx={{ flexDirection: "column", gap: "4vw" }}>
                <p style={{ fontFamily: "BowlbyOneSC", color: "#363775", fontSize: "1.3rem" }}>Produtos ({order.products.length})</p>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "1vw",
                        padding: "3vw",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        borderRadius: "5vw",
                    }}
                >
                    {order.products.map((item) => (
                        // é o mesmo componente usado no checkout, cuidado ao editar
                        <Product
                            key={item.id}
                            product={{ ...item, cover: "", brand: "", sold: 0, rating: 0, id: Number(item.referenceId) }}
                            hideCloseButton
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
