import React, { useState } from "react"
import { Box, CircularProgress, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { DefaultWrapper } from "../components/DefaultWrapper"
import { useFormik } from "formik"
import { api } from "../api"
import { ButtonComponent } from "../components/ButtonComponent"
import { useUser } from "../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"

interface FirstPasswordProps {}

interface FormType {
    hash: string
    password: string
}

export const FirstPassword: React.FC<FirstPasswordProps> = ({}) => {
    const hash = useParams().hash || ""
    const navigate = useNavigate()

    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<FormType>({
        initialValues: {
            hash,
            password: "",
        },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/user/first_password", values)
                const user = response.data
                snackbar({ severity: "success", text: "senha gerada com sucesso" })
                setUser(user)
                navigate("/")
            } catch (error) {
                snackbar({ severity: "error", text: "não rolou" })
                console.log(error)
            }

            setLoading(false)
        },
    })

    return (
        <DefaultWrapper>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ flexDirection: "column", width: 1, gap: 3 }}>
                    <TextField
                        label="nova senha"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                        type="password"
                    />
                    <ButtonComponent type="submit">{loading ? <CircularProgress size="1.5rem" /> : "enviar"}</ButtonComponent>
                </Box>
            </form>
        </DefaultWrapper>
    )
}
