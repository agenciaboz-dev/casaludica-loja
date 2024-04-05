import React from "react"
import { AlertColor, Box, Skeleton, SxProps, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                fontSize: isMobile ? "4vw" : "1.5rem",
                alignItems: "center",
                padding: isMobile ? "1vw" : 0,
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

const RealText: React.FC<{ value: string | number }> = ({ value }) => <CurrencyText value={value} style={{ fontSize: "1rem" }} />

export const OrderComponent: React.FC<OrderComponentProps> = ({ order, viewOrder }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
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
                gap: isMobile ? "2vw" : "1vw",
                border: "1px solid  gray",
                padding: isMobile ? "4vw" : "1vw",
                borderRadius: isMobile ? "4vw" : "1vw",
            }}
        >
            <Box sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                {viewOrder && <h4 style={{ fontFamily: "BowlbyOneSC", fontWeight: "600", color: colors.primary }}>Pedido #{order.referenceId}</h4>}
                {viewOrder && (
                    <p
                        style={{ textDecoration: "underline", fontSize: isMobile ? "3.5vw" : "1rem" }}
                        onClick={() => navigate(`/order/${order.referenceId}`)}
                    >
                        Ver Pedido{" >"}
                    </p>
                )}
            </Box>
            {order.status == "PENDING" && <PendingPayment orderId={order.referenceId} />}

            <Box alignItems="center" justifyContent={"space-between"}>
                <DataText title="Status: " value={status.text} color={status.color} bold />
                <p style={{ fontSize: "0.9rem", color: colors.primary }}>{new Date(Number(order.dateCreated)).toLocaleDateString("pt-br")} </p>
            </Box>
            {!viewOrder && (
                <>
                    <p style={{ fontFamily: "BowlbyOneSC", color: "gray", fontSize: "1.0rem" }}>Endereço de entrega</p>
                    <Box
                        sx={{
                            width: 1,
                            padding: isMobile ? "3vw" : "1vw",
                            flexDirection: "column",
                            borderRadius: isMobile ? "5vw" : "1vw",
                            border: "1px solid gray",
                            height: "fit-content",
                            overflowY: "auto",
                            maxHeight: "50vw",
                            gap: isMobile ? "3vw" : "1vw",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ gap: "2vw", alignItems: "center" }}>
                            <TiLocation color="gray" style={{ width: isMobile ? "10vw" : "2vw", height: isMobile ? "10vw" : "2vw" }} />
                            <p style={{ fontWeight: "bold", color: "rgba(85, 85, 85, 1)", fontSize: "0.85rem" }}>
                                {order.billing.address.address},{order.billing.address.number} - {order.billing.address.district},{" "}
                                {order.billing.address.city} - {order.billing.address.state}, {order.billing.address.postcode}
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

            <Box sx={{ flexDirection: "column", gap: isMobile ? "4vw" : "1vw", p: isMobile ? "1vw" : 0 }}>
                <p style={{ fontFamily: "BowlbyOneSC", color: "gray", fontSize: "1rem" }}>Itens ({order.products.length})</p>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: isMobile ? "5vw" : "1vw",
                        padding: isMobile ? "3vw" : "1vw",
                        borderRadius: isMobile ? "5vw" : "1vw",
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
                                  <Skeleton variant="rounded" animation="wave" key={index} sx={{ width: "100%", height: "100vw" }} />
                              </Box>
                          ))}
                </Box>
                <hr></hr>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "end",
                        gap: isMobile ? "2vw" : "1vw",
                    }}
                >
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}>Subtotal de Itens: </span>R$ {subtotal.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Frete: </span>
                        R$ {freight.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "1rem", color: "gray" }}>
                        <span style={{ fontWeight: "600" }}> Total:</span> R$ {order.total.toFixed(2)}
                    </p>
                </Box>
            </Box>
        </Box>
    )
}
