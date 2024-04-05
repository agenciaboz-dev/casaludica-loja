import React, { useState } from "react"
import { Box, Button, CircularProgress, MenuItem } from "@mui/material"
import { CollapsibleMenu } from "./CollapsibleMenu"
import { RoundedTextField } from "../../components/RoundedTextField"
import { useFormik } from "formik"
import { api } from "../../api"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../components/MaskedInput"
import { useCepMask, useNumberMask, usePhoneMask } from "burgos-masks"
import { estados } from "../../tools/estadosBrasil"

interface AddressProps {
    user: User
}

export const Address: React.FC<AddressProps> = ({ user }) => {
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const cep_mask = useCepMask()
    const phone_mask = usePhoneMask()
    const number_mask = useNumberMask({ allowDecimal: false, allowNegative: false })

    const formik = useFormik<Partial<User>>({
        initialValues: {
            id: user.id,
            address: user.address,
            number: user.number,
            district: user.district,
            complement: user.complement,
            city: user.city,
            state: user.state,
            postcode: user.postcode,
        },
        onSubmit: async (values) => {
            if (loading) return

            setLoading(true)
            console.log(values)
            try {
                const response = await api.post("/user/update", values)
                setUser(response.data)
                snackbar({ severity: "info", text: "Endereço atualizado" })
            } catch (error) {
                console.log(error)
                snackbar({ severity: "error", text: "Erro ao atualizar dados" })
            }
            setLoading(false)
        },
    })

    return (
        <CollapsibleMenu title="Endereço">
            <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
                <Box sx={{ flexDirection: "column", gap: "5vw", padding: "5vw 0", width: "100%" }}>
                    <RoundedTextField
                        label="CEP"
                        value={formik.values.postcode}
                        name="postcode"
                        onChange={formik.handleChange}
                        InputProps={{ inputComponent: MaskedInput, inputProps: { mask: cep_mask, inputMode: "numeric" } }}
                    />
                    <RoundedTextField
                        label="Endereço"
                        value={formik.values.address}
                        name="address"
                        onChange={formik.handleChange}
                    />
                    <RoundedTextField
                        label="Número"
                        value={formik.values.number}
                        name="number"
                        onChange={formik.handleChange}
                        InputProps={{ inputComponent: MaskedInput, inputProps: { mask: number_mask, inputMode: "numeric" } }}
                    />
                    <RoundedTextField
                        label="Bairro"
                        value={formik.values.district}
                        name="district"
                        onChange={formik.handleChange}
                    />
                    <RoundedTextField label="Cidade" value={formik.values.city} name="city" onChange={formik.handleChange} />
                    <RoundedTextField
                        label="Estado"
                        value={formik.values.state}
                        name="state"
                        onChange={formik.handleChange}
                        select
                        SelectProps={{
                            
                            MenuProps: { MenuListProps: { sx: { width: 1 } }, sx: { height: 0.7 } },
                        }}
                    >
                        <MenuItem sx={{ display: "none" }} value={""}></MenuItem>
                        {estados.map((uf) => (
                            <MenuItem key={uf.value} value={uf.value}>
                                {uf.label}
                            </MenuItem>
                        ))}
                    </RoundedTextField>
                    <RoundedTextField
                        label="Complemento"
                        value={formik.values.complement}
                        name="complement"
                        onChange={formik.handleChange}
                    />
                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end", borderRadius: "10vw" }}>
                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "salvar"}
                    </Button>
                </Box>
            </form>
        </CollapsibleMenu>
    )
}
