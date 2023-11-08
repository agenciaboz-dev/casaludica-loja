import React from "react"
import { Box, Dialog } from "@mui/material"
import { BozPay } from "boz.pay.component"
import { useFranchise } from "../hooks/useFranchise"

interface PayModalProps {
    open: boolean
    close: () => void
    orderId: string
}

export const PayModal: React.FC<PayModalProps> = ({ open, orderId, close }) => {
    const { franchise } = useFranchise()

    return (
        <Dialog open={open} onClose={() => close()} sx={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ height: "70vh", flexDirection: "column" }}>
                <BozPay
                    pagseguroToken="5e137c4a-acd6-433a-83a7-736815c6995b0ad8f02a47329494fac489b021d5ab384b54-9b9f-4140-b4cf-4675e700a829"
                    pagseguroTokenSandbox="1BD9D2D2181B4660BAFC9426CA5A63A9"
                    creditCardPublicKey="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApv7yDaw4aK+JNxjhxH7P1eTxZvoMfL2S4RifLUUB0+KBlN6uvKVj40wiBhLH7O9EPZeoVdApoK0M78Kol9LT3LYU4jQ0dFeeTeD/NV3AUguVBdJdIu8cUs0+oVvWAB4e0niEgax480x/Go7XG1ffvYAaYkO5FTeEH4qrwbz13a4ALPZ93ge6c6xZVspzAZc+WVnxcLeeoMoD4xz8DZS2LbqwOF9ee8Pcb8ybdr8p0vJL056Kb8AKYZ1mZ88nsdIqmR1jZ+BqRH6zMHW6UCVX6NgqWPkwemsfr2R5S+1EnHGH7ZAiUtRzCpejGVV33PIgOlb7j4JcCvQ6YP07AiiF3QIDAQAB"
                    storeIdentifier={`casaludica.mkt-${franchise}`}
                    referenceId={orderId}
                    sandbox
                    wrapperSx={{ width: "90vw", alignSelf: "center" }}
                />
            </Box>
        </Dialog>
    )
}
