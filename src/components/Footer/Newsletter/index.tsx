import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { ButtonComponent } from "../../ButtonComponent"

interface NewsletterProps {}

export const Newsletter: React.FC<NewsletterProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()

    const handleSubmit = (values: { name: string; email: string }) => {}

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

    return (
        <Box
            className="Newsletter-Component"
            style={{
                width: "100%",
                flexDirection: "column",
                gap: isMobile ? "1vw" : "0.5vw",
                color: colors.primary,
            }}
        >
            <Formik initialValues={{ name: "", email: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form
                        style={{
                            flexDirection: "column",
                            gap: isMobile ? "3vw" : "1vw",
                        }}
                    >
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
                            Inscreva-se
                        </ButtonComponent>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
