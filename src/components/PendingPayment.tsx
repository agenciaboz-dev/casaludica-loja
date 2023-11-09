import React, { useState } from "react"
import { Box } from "@mui/material"
import { ButtonComponent } from "./ButtonComponent"
import { PayModal } from "./PayModal"

interface PendingPaymentProps {
    orderId: string
}

export const PendingPayment: React.FC<PendingPaymentProps> = ({ orderId }) => {
    const [openPay, setOpenPay] = useState(false)

    return (
        <Box sx={{ gap: "5vw", flexDirection: "column", padding: "0 0 5vw", fontFamily: "BowlbyOneSC", color: "primary.main" }}>
            Ainda não recebemos o seu pagamento
            <ButtonComponent onClick={() => setOpenPay(true)}>Pagar</ButtonComponent>
            <PayModal orderId={orderId} open={openPay} close={() => setOpenPay(false)} />
        </Box>
    )
}
