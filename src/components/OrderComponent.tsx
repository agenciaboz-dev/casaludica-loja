import React from "react"
import { AlertColor, Box, Skeleton, SxProps } from "@mui/material"
import { Order } from "boz.pay.component"
import { CurrencyText } from "./CurrencyText"
import { Product } from "./Checkout/Product"
import { PendingPayment } from "./PendingPayment"
import statusEnum from "../tools/enumStatus"
import { useArray } from "burgos-array"
import { useColors } from "../hooks/useColors"
import { useNavigate } from "react-router-dom"
import { FaUserAlt } from "react-icons/fa"
import { FaPhone } from "react-icons/fa6"
import { TiLocation } from "react-icons/ti"
interface OrderComponentProps {
    order: Order
    viewOrder?: boolean
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
                fontSize: "4vw",
                alignItems: "center",
                padding: "1vw",
                color: "primary.main",
                fontFamily: "poppins",
                fontWeight: bold ? "bold" : "",
                gap: "1vw",
            }}
        >
            {title} <Box sx={{ fontSize: "1rem", color: `${color}.main`, fontWeight: bold ? "bold" : "" }}>{value}</Box>
        </Box>
    )
}

const RealText: React.FC<{ value: string | number }> = ({ value }) => (
    <CurrencyText value={value} style={{ fontSize: "1rem" }} />
)

export const OrderComponent: React.FC<OrderComponentProps> = ({ order, viewOrder }) => {
    const subtotal = order.products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    const freight = order.total - subtotal
    const status = statusEnum(order.status)
    const navigate = useNavigate()

    const skeletons = useArray().newArray(2)
    const colors = useColors()

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "2vw",
                border: "1px solid  gray",
                padding: "4vw",
                borderRadius: "4vw",
            }}
        >
            <Box sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                {viewOrder && (
                    <h4 style={{ fontFamily: "BowlbyOneSC", fontWeight: "600", color: colors.primary }}>
                        Pedido #{order.referenceId}
                    </h4>
                )}
                {viewOrder && (
                    <p
                        style={{ textDecoration: "underline", fontSize: "3.5vw" }}
                        onClick={() => navigate(`/order/${order.referenceId}`)}
                    >
                        Ver Pedido{" >"}
                    </p>
                )}
            </Box>
            {order.status == "PENDING" && <PendingPayment orderId={order.referenceId} />}

            <Box alignItems="center" justifyContent={"space-between"}>
                <DataText title="Status: " value={status.text} color={status.color} bold />
                <p style={{ fontSize: "0.9rem", color: colors.primary }}>
                    {new Date(Number(order.dateCreated)).toLocaleDateString("pt-br")}{" "}
                </p>
            </Box>
            {!viewOrder && (
                <>
                    <p style={{ fontFamily: "BowlbyOneSC", color: "gray", fontSize: "1.0rem" }}>Entregue em</p>
                    <Box
                        sx={{
                            width: 1,
                            padding: "3vw",
                            flexDirection: "column",
                            borderRadius: "5vw",
                            border: "1px solid gray",
                            height: "fit-content",
                            overflowY: "auto",
                            maxHeight: "50vw",
                            gap: "3vw",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ gap: "2vw" }}>
                            <TiLocation color="gray" style={{ width: "10vw", height: "10vw" }} />
                            <p style={{ fontWeight: "bold", color: "rgba(85, 85, 85, 1)", fontSize: "0.85rem" }}>
                                {order.billing.address.address},{order.billing.address.number} -{" "}
                                {order.billing.address.district}, {order.billing.address.city} -{" "}
                                {order.billing.address.state}, {order.billing.address.postcode}
                            </p>
                        </Box>
                        {/* <Box sx={{ gap: "2vw" }}>
                            <FaUserAlt color="gray" style={ { width: "4vw", height: "4vw" } } />
                          
                        </Box>
                        <Box sx={{ gap: "2vw" }}>
                            <FaPhone color="gray" style={{ width: "4vw", height: "4vw" }} />
                        </Box> */}
                    </Box>
                </>
            )}

            <Box sx={{ flexDirection: "column", gap: "4vw", p: "1vw" }}>
                <p style={{ fontFamily: "BowlbyOneSC", color: "gray", fontSize: "1.0rem" }}>
                    Itens ({order.products.length})
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
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}>Subtotal de Itens:</span>R${subtotal.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Frete: </span>
                        R${freight.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Total:</span> R${order.total.toFixed(2)}
                    </p>
                </Box>
            </Box>
        </Box>
    )
}
