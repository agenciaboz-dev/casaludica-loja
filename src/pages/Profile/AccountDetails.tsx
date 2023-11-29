import React from "react"
import { Box, Button } from "@mui/material"
import { CollapsibleMenu } from "./CollapsibleMenu"
import { RoundedTextField } from "../../components/RoundedTextField"
import { useFormik } from "formik"

interface AccountDetailsProps {
    user: User
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
    const formik = useFormik({
        initialValues: user,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <CollapsibleMenu title="Detalhes da Conta">
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <Box sx={{ flexDirection: "column", gap: "5vw", padding: "5vw 0", width: "100%" }}>
                    <RoundedTextField label="Nome" value={formik.values.name} name="name" onChange={formik.handleChange} />
                    <RoundedTextField label="Sobrenome" value={formik.values.lastname} name="lastname" onChange={formik.handleChange} />
                    <RoundedTextField label="E-mail" value={formik.values.email} name="email" onChange={formik.handleChange} />
                    <RoundedTextField label="Telefone" value={formik.values.phone} name="phone" onChange={formik.handleChange} />
                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end", borderRadius: "10vw" }}>
                        Salvar
                    </Button>
                </Box>
            </form>
        </CollapsibleMenu>
    )
}
