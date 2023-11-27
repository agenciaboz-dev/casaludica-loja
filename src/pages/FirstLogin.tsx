import React from "react"
import { Box } from "@mui/material"
import { Background } from "../components/Background"
import { Header } from "../components/Header"
import { SearchField } from "../components/SearchField"
import { Collections } from "./Home/Collections"

interface FirstLoginProps {}

export const FirstLogin: React.FC<FirstLoginProps> = ({}) => {
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "5vw", padding: "0 5vw" }}>
            <Background />
            <Header />
            <SearchField />
            <Collections />

            <Box sx={{ color: "primary.main", fontSize: "1.2rem " }}>
                <h3>Como é seu primeiro login, enviamos um link para o e-mail associado a essa conta para que você possa gerar uma senha.</h3>
            </Box>
        </Box>
    )
}
