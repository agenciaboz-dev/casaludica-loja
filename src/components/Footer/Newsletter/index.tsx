import { Box, Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { useColors } from '../../../hooks/useColors';
import { ButtonComponent } from "../../ButtonComponent"

interface NewsletterProps {}

export const Newsletter: React.FC<NewsletterProps> = ({}) => {
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
        sx: { padding: "3vw" },
    }

    return (
        <Box
            className="Newsletter-Component"
            style={{
                width: "100%",
                flexDirection: "column",
                gap: "1vw",
                color: colors.primary,
            }}
        >
            <p>Assine a nossa Newsletter e receba novidades e promoções!</p>
            <Formik initialValues={{ name: "", email: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form
                        style={{
                            flexDirection: "column",
                            gap: "3vw",
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
                        <ButtonComponent type="submit">Inscreva-se</ButtonComponent>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}