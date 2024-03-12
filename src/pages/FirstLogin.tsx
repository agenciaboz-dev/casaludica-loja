import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { DefaultWrapper } from "../components/DefaultWrapper"

interface FirstLoginProps {}

export const FirstLogin: React.FC<FirstLoginProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <DefaultWrapper>
            <Box sx={{ color: "primary.main", fontSize: "1.2rem ", margin: "3vw 0 9vw" }}>
                <h3>Como é seu primeiro login, enviamos um link para o e-mail associado a essa conta para que você possa gerar uma senha.</h3>
            </Box>
        </DefaultWrapper>
    )
}
