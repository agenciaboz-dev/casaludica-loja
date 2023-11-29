import React from "react"
import { Box, Button } from "@mui/material"
import { useFormik } from "formik"
import { CollapsibleMenu } from "./CollapsibleMenu"
import { RoundedTextField } from "../../components/RoundedTextField"

interface SafetyProps {
    user: User
}

export const Safety: React.FC<SafetyProps> = ({ user }) => {
    const formik = useFormik({
        initialValues: { password: "", new_password: "" },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <CollapsibleMenu title="Segurança">
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <Box sx={{ flexDirection: "column", gap: "5vw", padding: "5vw 0", width: "100%" }}>
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
                        name="password"
                        onChange={formik.handleChange}
                        type="password"
                    />
                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end", borderRadius: "10vw" }}>
                        Salvar
                    </Button>
                </Box>
            </form>
        </CollapsibleMenu>
    )
}
