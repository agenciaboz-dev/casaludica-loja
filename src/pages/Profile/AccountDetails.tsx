import React, { useState } from "react"
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material"
import { CollapsibleMenu } from "./CollapsibleMenu"
import { RoundedTextField } from "../../components/RoundedTextField"
import { useFormik } from "formik"
import { api } from "../../api"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { usePhoneMask } from "burgos-masks"
import MaskedInput from "../../components/MaskedInput"

interface AccountDetailsProps {
    user: User
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const phone_mask = usePhoneMask()

    const formik = useFormik({
        initialValues: {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
        },
        onSubmit: async (values) => {
            if (loading) return

            setLoading(true)
            console.log(values)
            try {
                const response = await api.post("/user/update", values)
                setUser(response.data)
                snackbar({ severity: "info", text: "Dados atualizados" })
            } catch (error) {
                console.log(error)
                snackbar({ severity: "error", text: "Erro ao atualizar dados" })
            }
            setLoading(false)
        },
    })

    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <CollapsibleMenu title="Detalhes da Conta">
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw", padding: isMobile ? "5vw 0" : "1.5vw 0", width: "100%" }}>
                    <RoundedTextField label="Nome" value={formik.values.name} name="name" onChange={formik.handleChange} />
                    <RoundedTextField label="Sobrenome" value={formik.values.lastname} name="lastname" onChange={formik.handleChange} />
                    <RoundedTextField
                        label="E-mail"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        InputProps={{ inputMode: "email" }}
                    />
                    <RoundedTextField
                        label="Telefone"
                        value={formik.values.phone}
                        name="phone"
                        onChange={formik.handleChange}
                        InputProps={{ inputComponent: MaskedInput, inputProps: { mask: phone_mask, inputMode: "numeric" } }}
                    />
                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end", borderRadius: "10vw" }}>
                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                    </Button>
                </Box>
            </form>
        </CollapsibleMenu>
    )
}
