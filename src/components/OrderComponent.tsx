import React from "react"
import { AlertColor, Box, Skeleton, SxProps } from "@mui/material"
import { Order } from "boz.pay.component"
import { CurrencyText } from "./CurrencyText"
import { Product } from "./Checkout/Product"
import { PendingPayment } from "./PendingPayment"
import statusEnum from "../tools/enumStatus"
import { useArray } from "burgos-array"

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
                fontFamily: "poppins",
                justifyContent: "space-between",
                fontWeight: bold ? "bold" : "",
            }}
        >
            {title}
            <Box sx={{ textAlign: "flex-end", fontSize: "1rem", color: `${color}.main`, fontWeight: bold ? "bold" : "" }}>
                {value}
            </Box>
        </Box>
    )
}

const RealText: React.FC<{ value: string | number }> = ({ value }) => (
    <CurrencyText value={value} style={{ fontSize: "1rem" }} />
)

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }) => {
    const subtotal = order.products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    const freight = order.total - subtotal
    const status = statusEnum(order.status)

    const skeletons = useArray().newArray(2)

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "2vw",
                border: "1px solid  gray",
                padding: "4vw",
                borderRadius: "4vw",
                // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
        >
            <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontFamily: "BowlbyOneSC", fontWeight: "600" }}>Pedido #{order.referenceId}</h4>
                <p style={{ fontSize: "0.9rem" }}>{new Date(Number(order.dateCreated)).toLocaleDateString("pt-br")} </p>
            </Box>
            {order.status == "PENDING" && <PendingPayment orderId={order.referenceId} />}

            <DataText title="Status: " value={status.text} color={status.color} bold />

            <Box sx={{ flexDirection: "column", gap: "4vw" }}>
                <p style={{ fontFamily: "BowlbyOneSC", color: "gray", fontSize: "1.0rem" }}>
                    Items ({order.products.length})
                </p>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "5vw",
                        padding: "3vw",
                        borderRadius: "5vw",
                        border: "1px solid gray",
                        height: "fit-content",
                        overflowY: "auto",
                        maxHeight: "50vw",
                    }}
                >
                    {!!order.products.length
                        ? order.products.map((item) => (
                              // é o mesmo componente usado no checkout, cuidado ao editar

                              <Product
                                  key={item.id}
                                  product={{
                                      ...item,
                                      cover: "",
                                      brand: "",
                                      sold: 0,
                                      rating: 0,
                                      id: Number(item.referenceId),
                                  }}
                                  hideCloseButton
                              />
                          ))
                        : skeletons.map((index) => (
                              <Box>
                                  <Skeleton
                                      variant="rounded"
                                      animation="wave"
                                      key={index}
                                      sx={{ width: "100%", height: "100vw" }}
                                  />
                              </Box>
                          ))}
                </Box>
                <hr></hr>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "end",
                        gap: "2vw",
                    }}
                >
                    <p style={{ fontSize: "0.9rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}>Subtotal de Itens:</span>R${subtotal.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Frete: </span>
                        R${freight.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Total:</span> R${order.total.toFixed(2)}
                    </p>
                </Box>
            </Box>
        </Box>
    )
}
