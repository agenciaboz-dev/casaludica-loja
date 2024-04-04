import React, { useState } from "react"
import { Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { useApi } from "../../hooks/useApi"
import { useLocation, useNavigate } from "react-router-dom"
import { useMenu } from "../../hooks/useMenu"

interface LoginContainerProps {
    color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"
    redirect?: string
    setHavePassword?: React.Dispatch<React.SetStateAction<boolean>>
    setLoginString?: React.Dispatch<React.SetStateAction<string>>
}

export const input_style = {
    "& .MuiOutlinedInput-root": { borderRadius: "8vw", height: "12vw", fontSize: "1rem", border: "1px solid primary" },
    "& .MuiTextField-root": { borderRadius: "8vw", fontSize: "1rem" },
}
export const LoginContainer: React.FC<LoginContainerProps> = ({ color, redirect, setHavePassword, setLoginString }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const navigate = useNavigate()
    const menu = useMenu()
    // setLoginString(useLocation().state?.login)

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { login: "" },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const user = (await api.user.isSignedUp(values.login)).data as User
                if (setHavePassword && user.password) {
                    setHavePassword(true)
                    if (setLoginString) setLoginString(values.login)
                } else {
                    navigate("/first_login", { state: { login: values.login } })
                    menu.setOpen(false)
                }
            } catch (error) {
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <Box
            sx={{
                width: "100%",
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                color: "white",
                marginBottom: isMobile ? "-5vw" : "0",
            }}
        >
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <TextField
                    label="E-mail ou CPF"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    name="login"
                    color={color || "primary"}
                    variant="outlined"
                    sx={input_style}
                    required
                    autoFocus
                />
                <Button variant="contained" color="success" sx={{ borderRadius: "5vw" }} type="submit">
                    {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "entrar"}
                </Button>
            </form>
        </Box>
    )
}
