import React, { useState } from "react"
import { Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { useApi } from "../../hooks/useApi"
import { ButtonComponent } from "../ButtonComponent"
import { useNavigate } from "react-router-dom"
import { useMenu } from "../../hooks/useMenu"

interface LoginContainerProps {
    color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"
    redirect?: string
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ color, redirect }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const navigate = useNavigate()
    const menu = useMenu()

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { login: "" },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const user = (await api.user.isSignedUp(values.login)).data
                navigate(user ? (user.password ? "/login" : "/first_login") : "/signup", { state: { login: values.login, redirect } })
                menu.setOpen(false)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: isMobile ? "5vw" : "1vw", color: "white", marginBottom: isMobile ? "-5vw" : "0" }}>
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <TextField
                    label="E-mail ou CPF"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    name="login"
                    color={color || "primary"}
                    variant="standard"
                    InputProps={{ sx: { color: "white" } }}
                    required
                />
                <Button variant="contained" color="success" sx={{ borderRadius: "5vw" }} type="submit">
                    {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "entrar"}
                </Button>
            </form>
        </Box>
    )
}
