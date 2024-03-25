import React, { useState } from "react"
import { Box, Dialog } from "@mui/material"
import { BozPay } from "boz.pay.component"
import { useFranchise } from "../hooks/useFranchise"
import backdropStyle from "../style/blurred_backdrop"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "./ButtonComponent"
import { useCart } from "../hooks/useCart"
import { api } from "../api"

interface PayModalProps {
    open: boolean
    close: () => void
    orderId: string
}

export const PayModal: React.FC<PayModalProps> = ({ open, orderId, close }) => {
    const navigate = useNavigate()

    const { franchise_id: franchise, bozpayStoreIdentifier } = useFranchise()
    const { reset } = useCart()

    const [orderButton, setOrderButton] = useState(false)

    const onPaid = async (charge: Charge) => {
        console.log(charge)
        setOrderButton(true)
        reset()
        try {
            const paid_response = await api.post("/order/paid", { charge, storeId: franchise })
        } catch (error) {}
    }

    return (
        <Dialog
            open={open}
            sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
            PaperProps={{ sx: { borderRadius: "5vw", maxWidth: "100vw", margin: "0 5vw" } }}
            slotProps={{ backdrop: { sx: backdropStyle } }}
            onClose={close}
        >
            <Box sx={{ height: "100vh", flexDirection: "column", alignItems: "center" }}>
                {!!orderId && (
                    <BozPay
                        pagseguroToken="5e137c4a-acd6-433a-83a7-736815c6995b0ad8f02a47329494fac489b021d5ab384b54-9b9f-4140-b4cf-4675e700a829"
                        pagseguroTokenSandbox="1BD9D2D2181B4660BAFC9426CA5A63A9"
                        creditCardPublicKey="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApv7yDaw4aK+JNxjhxH7P1eTxZvoMfL2S4RifLUUB0+KBlN6uvKVj40wiBhLH7O9EPZeoVdApoK0M78Kol9LT3LYU4jQ0dFeeTeD/NV3AUguVBdJdIu8cUs0+oVvWAB4e0niEgax480x/Go7XG1ffvYAaYkO5FTeEH4qrwbz13a4ALPZ93ge6c6xZVspzAZc+WVnxcLeeoMoD4xz8DZS2LbqwOF9ee8Pcb8ybdr8p0vJL056Kb8AKYZ1mZ88nsdIqmR1jZ+BqRH6zMHW6UCVX6NgqWPkwemsfr2R5S+1EnHGH7ZAiUtRzCpejGVV33PIgOlb7j4JcCvQ6YP07AiiF3QIDAQAB"
                        storeIdentifier={bozpayStoreIdentifier}
                        referenceId={orderId}
                        sandbox
                        wrapperSx={{ width: "100%", alignSelf: "center" }}
                        onPaid={onPaid}
                    />
                )}
            </Box>
            <Dialog open={orderButton} hideBackdrop PaperProps={{ sx: { display: "contents" } }} sx={{ justifyContent: "center" }}>
                <Box sx={{ position: "absolute", bottom: "15vw", width: "90vw" }}>
                    <ButtonComponent fullWidth onClick={() => navigate(`/order/${orderId}`)}>
                        Visualizar pedido
                    </ButtonComponent>
                </Box>
            </Dialog>
        </Dialog>
    )
}
