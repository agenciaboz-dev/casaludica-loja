import React, { useState } from "react"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from "@mui/material"
import { Order } from "boz.pay.component"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface OrderModalProps {
    order: Order
}

export const OrderModal: React.FC<OrderModalProps> = ({ order }) => {
    const [isOpen, setIsOpen] = useState(true)
    const isMobile = useMediaQuery("(orientation: portrait)")

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
                    Você recebeu seu pedido?
                </DialogContentText>
                <Accordion
                    sx={{ backgroundColor: "transparent", boxShadow: "none", flexDirection: "column", padding: 0, width: 1 }}
                >
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
                                <>
                                    <Box
                                        key={product.id}
                                        sx={{
                                            color: "gray",
                                            gap: "2vw",
                                            alignItems: "center",
                                            width: 1,
                                            justifyContent: "space-between",
                                            marginTop: "2vw",
                                        }}
                                    >
                                        <Box sx={{ flexDirection: "row", gap: "2vw", alignItems: "center", width: 0.8 }}>
                                            {/* <Avatar src={product.cover} variant="circular" sx={{ width: "8vw", height: "8vw" }} /> */}
                                            <p
                                                style={{
                                                    width: "100%", // Define a largura para 100% ou um valor específico em pixels
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden", // Garante que o conteúdo que excede a largura seja escondido
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {product.name}
                                            </p>
                                        </Box>
                                        <p>{product.quantity} x</p>
                                    </Box>
                                </>
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
                <Button>não</Button>
                <Button variant="contained"> Sim, Recebi</Button>
            </DialogActions>
        </Dialog>
    )
}
