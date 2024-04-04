import React, { useEffect, useState } from "react"
import { Box, CircularProgress, useMediaQuery } from "@mui/material"
import { DefaultWrapper } from "../components/DefaultWrapper"
import { ButtonComponent } from "../components/ButtonComponent"
import { useLocation, useNavigate } from "react-router-dom"
import { api } from "../api"
import { useSnackbar } from "burgos-snackbar"

interface FirstLoginProps {}

export const FirstLogin: React.FC<FirstLoginProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const login = useLocation().state.login
    const [loading, setLoading] = useState(false)
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleClick = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await api.post("/user/exists", { login })
            snackbar({ severity: "info", text: "E-mail reenviado" })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!login) navigate("/home")
    }, [])
    return login ? (
        <DefaultWrapper>
            <Box
                sx={{
                    color: "primary.main",
                    fontSize: "1.2rem ",
                    margin: "3vw 0 9vw",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4vw",
                    width: 1,
                }}
            >
                <h4 style={{ fontFamily: "BowlbyOneSC", alignSelf: "center" }}>Parece ser seu primeiro login</h4>
                <p style={{ fontSize: "1.1rem", textAlign: "justify" }}>
                    Enviamos um link para o seu e-mail cadastrado para que você possa gerar sua senha. Caso Tenha problemas,
                    clique no botão abaixo para enviarmos outro link.
                </p>

                <ButtonComponent variant="contained" sx={{ width: 1 }} onClick={handleClick}>
                    {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "Enviar novamente"}
                </ButtonComponent>
            </Box>
        </DefaultWrapper>
    ) : null
}
