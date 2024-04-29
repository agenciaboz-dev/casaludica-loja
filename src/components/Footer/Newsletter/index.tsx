import { Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useColors } from "../../../hooks/useColors"
import { ButtonComponent } from "../../ButtonComponent"
import { api } from "../../../api"
import { useSnackbar } from "burgos-snackbar"

interface NewsletterProps {}

export const Newsletter: React.FC<NewsletterProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: { name: string; email: string }) => {
        if (loading) return

        setLoading(true)
        await api.post("/newsletter", values)
        snackbar({ severity: "success", text: "Assinado com sucesso!" })

        setLoading(false)
    }

    const textFieldSx = {
        backgroundColor: "#D9D9D9",
        borderRadius: "10vw",
    }

    const InputProps = {
        disableUnderline: true,
        sx: {
            borderRadius: "10vw",
            backgroundColor: "#D9D9D9",
        },
    }

    const inputProps = {
        sx: { padding: isMobile ? "3vw" : "0.75vw" },
    }

    const h2Style = {
        fontSize: isMobile ? "6vw" : "1.5rem",
    }

    const pStyle = {
        fontSize: isMobile ? "5vw" : "1.2rem",
    }

    const containerStyle: React.CSSProperties = {
        width: "100%",
        flexDirection: "column",
    }

    return (
        <Box
            className="Newsletter-Component"
            style={{
                width: "100%",
                flexDirection: "column",
                gap: isMobile ? "1vw" : "0.5vw",
                color: colors.primary,
                justifyContent: "space-between",
            }}
        >
            <Box className="container" style={containerStyle}>
                <h2 style={h2Style}>Fale com a gente</h2>
                <p style={pStyle}>(47) 9617-9411</p>
                <p style={pStyle}>falecom@casaludica.com.br</p>
            </Box>
            <Formik initialValues={{ name: "", email: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form
                        style={{
                            flexDirection: "column",
                            gap: isMobile ? "3vw" : "1vw",
                        }}
                    >
                        <p style={{ ...pStyle, marginTop: isMobile ? "6vw" : "1vw" }}>Assine a nossa Newsletter e receba novidades e promoções!</p>
                        <TextField
                            id="name"
                            sx={textFieldSx}
                            placeholder={"Nome"}
                            InputProps={InputProps}
                            inputProps={inputProps}
                            variant="filled"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <TextField
                            id="email"
                            sx={textFieldSx}
                            placeholder={"E-mail"}
                            InputProps={InputProps}
                            inputProps={inputProps}
                            variant="filled"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <ButtonComponent
                            type="submit"
                            sx={{
                                padding: "0.5vw",
                            }}
                        >
                            {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Inscreva-se"}
                        </ButtonComponent>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
