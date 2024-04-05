import React, { useState } from "react"
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { CollapsibleMenu } from "./CollapsibleMenu"
import { RoundedTextField } from "../../components/RoundedTextField"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { api } from "../../api"

interface SafetyProps {
    user: User
}

export const Safety: React.FC<SafetyProps> = ({ user }) => {
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { password: "", new_password: "" },
        onSubmit: async (values) => {
            if (loading) return

            if (values.password == user.password) {
                setLoading(true)
                console.log(values)
                try {
                    const response = await api.post("/user/update", { id: user.id, password: values.new_password })
                    setUser(response.data)
                    snackbar({ severity: "info", text: "Dados atualizados" })
                } catch (error) {
                    console.log(error)
                    snackbar({ severity: "error", text: "Erro ao atualizar dados" })
                }
                setLoading(false)
            } else {
                snackbar({ severity: "warning", text: "Senha inválida" })
            }
        },
    })

    return (
        <CollapsibleMenu title="Segurança">
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <Box sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1.5vw", padding: isMobile ? "5vw 0" : "1.5vw 0", width: "100%" }}>
                    <RoundedTextField
                        label="Senha atual"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        type="password"
                    />
                    <RoundedTextField
                        label="Nova senha"
                        value={formik.values.new_password}
                        name="new_password"
                        onChange={formik.handleChange}
                        type="password"
                    />
                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end", borderRadius: "10vw" }}>
                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                    </Button>
                </Box>
            </form>
        </CollapsibleMenu>
    )
}
