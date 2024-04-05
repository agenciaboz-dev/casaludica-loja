import React, { useState } from "react"
import { Box, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { api } from "../../api"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { input_style } from "./LoginContainer"
import { ButtonComponent } from "../ButtonComponent"
import { useCpfMask } from "burgos-masks"
import MaskedInput from "../MaskedInput"
import { useValidateCPF } from "burgos-documents"

interface SignupContainerProps {
    onSignup: () => void
}

interface SignupForm {
    email: string
    password: string
    confirm_password: string
    cpf: string
}

export const SignupContainer: React.FC<SignupContainerProps> = ({ onSignup }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const cpf_mask = useCpfMask()
    const validateCPF = useValidateCPF()
    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<SignupForm>({
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
            cpf: "",
        },
        onSubmit: async (values) => {
            if (loading) return

            if (!values.password || values.password != values.confirm_password) {
                snackbar({ severity: "error", text: "senhas não conferem" })
                return
            }

            if (!validateCPF(values.cpf)) {
                snackbar({ severity: "error", text: "insira um CPF válido" })
                return
            }

            setLoading(true)
            try {
                const response = await api.post("/user/signup", values)
                const user = response.data as User
                setUser(user)
                snackbar({ severity: "success", text: "usuário criado com sucesso" })
                navigate("/")
                onSignup()
            } catch (error) {
                console.log(error)
                snackbar({ severity: "error", text: "Não foi possível criar o usário" })
            } finally {
                setLoading(false)
            }
        },
    })
    return (
        <Box sx={{ flexDirection: "column", gap: 2 }}>
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <TextField
                    sx={input_style(isMobile)}
                    label="E-mail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    InputProps={{ inputMode: "email" }}
                    required
                />
                <TextField
                    sx={input_style(isMobile)}
                    label="CPF"
                    name="cpf"
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                    InputProps={{ inputComponent: MaskedInput, inputProps: { mask: cpf_mask, inputMode: "numeric" } }}
                    required
                />
                <TextField
                    sx={input_style(isMobile)}
                    label="Senha"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type="password"
                    required
                />
                <TextField
                    sx={input_style(isMobile)}
                    label="Confirme sua senha"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    type="password"
                    required
                />
                <ButtonComponent type="submit">{loading ? <CircularProgress size="1.5rem" color="secondary" /> : "enviar"}</ButtonComponent>
            </form>
        </Box>
    )
}
