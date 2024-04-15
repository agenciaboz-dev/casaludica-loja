import React, { useState } from "react"
import { Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { ButtonComponent } from "../components/ButtonComponent"
import { useUser } from "../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { input_style } from "../components/Menu/LoginContainer"
import { api } from "../api"
import { useMenu } from "../hooks/useMenu"
import { ArrowBackIos, FamilyRestroomTwoTone } from "@mui/icons-material"

interface LoginMenuProps {
    onBack: () => void
    setLoginString: React.Dispatch<React.SetStateAction<string>>
    setHavePassword: React.Dispatch<React.SetStateAction<boolean>>
    loginString: string
}

export const LoginMenu: React.FC<LoginMenuProps> = ({ loginString, setLoginString, onBack, setHavePassword }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [loading, setLoading] = useState(false)
    const [forgetPasswordTimeout, setForgetPasswordTimeout] = useState(60)

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    // const login = useLocation().state?.login
    // const redirect = useLocation().state?.redirect

    const navigate = useNavigate()
    const menu = useMenu()

    const formik = useFormik({
        initialValues: { login: loginString || "", password: "" },
        onSubmit: async (values) => {
            if (loading) return
            try {
                setLoading(true)
                const response = await api.post("/user/login ", values)
                const user = response.data
                if (user) {
                    setUser(user)
                    // navigate(redirect || "/")
                    menu.setOpen(false)
                    menu.setRenderForm(false)
                    // onBack()
                } else {
                    snackbar({ severity: "error", text: "Credenciais inválidas" })
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
    })

    const onForgetPassword = async () => {
        if (new Date().getTime() > forgetPasswordTimeout) {
            try {
                setForgetPasswordTimeout(new Date().getTime() + 60 * 1000)
                const response = await api.post("user/forget_password", { login: formik.values.login })
                snackbar({ severity: "info", text: "um link para redefinição de senha foi enviado ao e-mail associado a este usuário" })
            } catch (error) {
                snackbar({ severity: "warning", text: "nenhum usuário encontrado com esse e-mail ou cpf" })
            }
        } else {
            snackbar({
                severity: "warning",
                text: `tente novamente em ${Math.round((forgetPasswordTimeout - new Date().getTime()) / 1000)} segundos`,
            })
        }
    }

    return (
        <Box sx={{ justifyItems: "space-between", height: 1 }}>
            <Box
                sx={{
                    flexDirection: "column",
                    gap: isMobile ? "4vw" : "1vw",
                    color: "primary.main",
                    fontSize: "1.2rem",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <h3 style={{ width: "100%" }}>Entrar</h3>
                    <ArrowBackIos
                        onClick={() => {
                            setHavePassword(false)
                        }}
                    />
                </Box>
                <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                    <TextField
                        label="E-mail ou CPF"
                        name="login"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        sx={input_style(isMobile)}
                        InputLabelProps={{ style: { padding: isMobile ? "0 2vw" : "0 0.5vw" } }}
                        required
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                        autoFocus={!!loginString}
                        sx={input_style(isMobile)}
                        InputLabelProps={{ style: { padding: isMobile ? "0 2vw" : "0 0.5vw" } }}
                        type="password"
                    />
                    <ButtonComponent type="submit" fullWidth>
                        {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "Entrar"}
                    </ButtonComponent>
                    <Button sx={{ padding: 0, minHeight: 0, textDecoration: "underline", textTransform: "none" }} onClick={onForgetPassword}>
                        Esqueci minha senha
                    </Button>
                </form>
            </Box>
        </Box>
    )
}
