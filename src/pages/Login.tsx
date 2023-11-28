import React, { useState } from "react"
import { Box, CircularProgress, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
import { ButtonComponent } from "../components/ButtonComponent"
import { useApi } from "../hooks/useApi"
import { useUser } from "../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { DefaultWrapper } from "../components/DefaultWrapper"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const [loading, setLoading] = useState(false)

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const login = useLocation().state?.login
    const api = useApi()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: { login: login || "", password: "" },
        onSubmit: (values) => {
            setLoading(true)
            api.user
                .login(values.login, values.password)
                .then((response) => {
                    const user = response.data
                    if (user) {
                        setUser(user)
                        navigate("/")
                    } else {
                        snackbar({ severity: "error", text: "Credenciais inválidas" })
                    }
                })
                .finally(() => setLoading(false))
        }
    })

    return (
        <DefaultWrapper>
            <Box sx={{ flexDirection: "column", gap: "5vw", color: "primary.main", fontSize: "1.2rem" }}>
                <h3>Entrar</h3>
                <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                    <TextField label="E-mail ou CPF" name="login" value={formik.values.login} onChange={formik.handleChange} required />
                    <TextField label="Senha" name="password" value={formik.values.password} onChange={formik.handleChange} required />
                    <ButtonComponent type="submit">{loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "entrar"}</ButtonComponent>
                </form>
            </Box>
        </DefaultWrapper>
    )
}
