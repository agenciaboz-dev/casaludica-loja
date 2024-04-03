import React, { useState } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { Order } from "boz.pay.component"

interface OrderModalProps {
    order: Order
}

export const OrderModal: React.FC<OrderModalProps> = ({ order }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Pedido #{order.referenceId}</DialogTitle>
            <DialogContent>
                <DialogContentText>seu pedido já chegou?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>não</Button>
                <Button variant="contained">já</Button>
            </DialogActions>
        </Dialog>
    )
}
