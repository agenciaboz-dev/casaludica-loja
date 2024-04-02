import React from "react"
import { DefaultWrapper } from "../components/DefaultWrapper"
import { Box } from "@mui/material"

interface DataDeletionInformationProps {}

export const DataDeletionInformation: React.FC<DataDeletionInformationProps> = ({}) => {
    return (
        <DefaultWrapper>
            <Box sx={{ flexDirection: "column", gap: 2, pb: 10 }}>
                <Box sx={{ fontSize: "1.5rem" }}>Deletar dados pessoais</Box>
                <Box>
                    Para deletar seus dados pessoais, entre na sua conta e navegue até o seu perfil utilizando o menu a esquerda. Na seção segurança,
                    clique no botão "deletar conta".
                </Box>
            </Box>
        </DefaultWrapper>
    )
}
