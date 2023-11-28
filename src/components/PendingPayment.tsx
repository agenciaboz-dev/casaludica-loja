import React, { useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { PayModal } from "./PayModal"
import { Box } from "@mui/material"

interface PendingPaymentProps {
    orderId: string
}

export const PendingPayment: React.FC<PendingPaymentProps> = ({ orderId }) => {
    const [openPay, setOpenPay] = useState(false)

    return (
        <Box
            sx={{
                gap: "5vw",
                flexDirection: "column",
                padding: "5vw 0 5vw",
                fontFamily: "BowlbyOneSC",
                color: "error.main"
            }}>
            Ainda não recebemos o seu pagamento
            <ButtonComponent onClick={() => setOpenPay(true)}>Pagar</ButtonComponent>
            <PayModal orderId={orderId} open={openPay} close={() => setOpenPay(false)} />
        </Box>
    )
}
