import React, { useState } from "react"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from "@mui/material"
import { Order } from "boz.pay.component"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { api } from "../api"
import { ProductContainerOnModal } from "./ProductContainerOnModal"

interface OrderModalProps {
    order: Order
}

export const OrderModal: React.FC<OrderModalProps> = ({ order }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [isOpen, setIsOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const [ratings, setRatings] = useState<{ id: number; rating: number }[]>([])

    const onConfirm = async () => {
        // if (loading) return

        const data: { bozpay_id: number; reference_id: string } = {
            bozpay_id: order.id,
            reference_id: order.referenceId,
        }

        setLoading(true)
        try {
            const response = await api.post("/order/confirm_receiving", data)
            if (response.status == 200) {
                console.log("success")
                setConfirmed(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onRatingChange = (id: number, value: number) => {
        setRatings((ratings) => [...ratings.filter((item) => item.id != id), { id, rating: value }])
    }

    const onReview = async () => {
        setLoading(true)
        try {
            const response = await api.post("/order/review", { ratings })
            if (response.status == 200) {
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            sx={{
                "& .MuiDialog-paper": {
                    width: "75%",
                    borderRadius: isMobile ? "3vw" : "1vw",
                    gap: "2vw",
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#EAECEF" }}>Pedido #{order.referenceId}</DialogTitle>
            <DialogContent sx={{ flexDirection: "column" }}>
                <DialogContentText sx={{ fontSize: "1.1rem", color: "primary.main", marginTop: "2vw" }}>
                    {confirmed ? "Avaliar os produtos" : "Você recebeu seu pedido?"}
                </DialogContentText>
                <Accordion sx={{ backgroundColor: "transparent", boxShadow: "none", flexDirection: "column", padding: 0, width: 1 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ width: 1, padding: 0, color: "gray", textDecoration: "underline" }}
                    >
                        Resumo do pedido
                    </AccordionSummary>
                    <AccordionDetails sx={{ gap: "4vw", padding: 0, width: 1 }}>
                        <Box sx={{ flexDirection: "column", gap: "1vw", alignItems: "center", p: 0 }}>
                            {order.products.slice(0, 3).map((product) => (
                                <ProductContainerOnModal product={product} key={product.id} onRatingChange={onRatingChange} confirmed={confirmed} />
                            ))}
                            {order.products.length > 3 && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        p: 0,
                                        marginTop: "3vw",
                                    }}
                                >
                                    <p
                                        style={{
                                            width: "100%",
                                            fontSize: "0.8rem",
                                            marginTop: "2vw",
                                            textAlign: "right", // Alinha o texto à direita dentro do <p>
                                        }}
                                    >
                                        ... outros produtos
                                    </p>
                                </Box>
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", p: 0, marginTop: "3vw" }}>
                    <p style={{ margin: 0 }}>
                        <span style={{ fontWeight: "bold" }}> Total:</span> R$ {order.total}
                    </p>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)}>não</Button>
                <Button variant="contained" onClick={confirmed ? onReview : onConfirm}>
                    {loading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : confirmed ? "Enviar avaliação" : "Sim, Recebi"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
