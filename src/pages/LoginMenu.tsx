import React, { useState } from "react"
import { Box, CircularProgress, TextField } from "@mui/material"
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
    setLogin: (value: boolean) => void
    setLoginString: React.Dispatch<React.SetStateAction<string>>
    setHavePassword: React.Dispatch<React.SetStateAction<boolean>>
    loginString: string
}

export const LoginMenu: React.FC<LoginMenuProps> = ({ loginString, setLoginString, setLogin, setHavePassword }) => {
    const [loading, setLoading] = useState(false)

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    // const login = useLocation().state?.login
    const redirect = useLocation().state?.redirect

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
                    navigate(redirect || "/")
                    menu.setOpen(false)
                    setLogin(false)
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

    return (
        <Box sx={{ justifyItems: "space-between", height: 1 }}>
            <Box
                sx={{
                    flexDirection: "column",
                    gap: "4vw",
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
                        sx={input_style}
                        required
                    />
                    <TextField
                        label="Senha"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                        autoFocus={!!loginString}
                        sx={input_style}
                        type="password"
                    />
                    <ButtonComponent type="submit" fullWidth>
                        {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "entrar"}
                    </ButtonComponent>
                </form>
            </Box>
        </Box>
    )
}
