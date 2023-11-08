import React from "react"
import { Box, Paper, SxProps, TextField } from "@mui/material"
import { FormikHelpers, useFormik } from "formik"

interface BillingProps {
    formik: {
        values: BillingForm
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
    }
}

export const Billing: React.FC<BillingProps> = ({ formik }) => {
    const inputStyle: SxProps = { bgcolor: "#F0EEEE" }

    return (
        <Box sx={{ flexDirection: "column", color: "primary.main", gap: "5vw" }}>
            <p style={{ fontFamily: "BowlbyOneSC" }}>Detalhes da cobrança</p>

            <form onSubmit={formik.handleSubmit}>
                <Paper elevation={5} sx={{ flexDirection: "column", borderRadius: "4.5vw", width: "100%", padding: "3vw", gap: "5vw" }}>
                    <TextField
                        label="Nome"
                        value={formik.values.name}
                        name="name"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Sobrenome"
                        value={formik.values.lastname}
                        name="lastname"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="CPF"
                        value={formik.values.cpf}
                        name="cpf"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Nome da Empresa (opcional)"
                        value={formik.values.company}
                        name="company"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                    />
                    <TextField
                        label="CEP"
                        value={formik.values.postalcode}
                        name="postalcode"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Endereço"
                        value={formik.values.address}
                        name="address"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Número"
                        value={formik.values.number}
                        name="number"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Bairro"
                        value={formik.values.district}
                        name="district"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Complement (opcional)"
                        value={formik.values.complement}
                        name="complement"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                    />
                    <TextField
                        label="Cidade"
                        value={formik.values.city}
                        name="city"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Estado"
                        value={formik.values.state}
                        name="state"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Telefone"
                        value={formik.values.phone}
                        name="phone"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="E-mail"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        required
                    />
                    <TextField
                        label="Notas do pedido (opcional)"
                        value={formik.values.notes}
                        name="notes"
                        onChange={formik.handleChange}
                        InputProps={{ sx: inputStyle }}
                        multiline
                        minRows={3}
                    />
                </Paper>
            </form>
        </Box>
    )
}
