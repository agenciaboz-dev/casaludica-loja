import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle, TextField, Box } from '@mui/material'
import Button from '@mui/material/Button'
import { Form, Formik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import MaskedInput from "react-text-mask"
import { useApi } from '../../hooks/useApi'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { api } from "../../api"
import { useFranchise } from "../../hooks/useFranchise"

interface CepModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const CepModal: React.FC<CepModalProps> = ({ open, setOpen }) => {
    const ref = useRef<MaskedInput>(null)
    const _api = useApi()
    const storage = useLocalStorage()
    const franchise = useFranchise()

    const [error, setError] = useState("")
    const [cep, setCep] = useState("")
    const [address, setAddress] = useState<Address | null>(null)
    const [loading, setLoading] = useState(false)

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason) return
        setOpen(false)
    }

    const saveAddress = async () => {
        setOpen(false)
        storage.set("address", address)
        franchise.setCurrentAddress(address || undefined)

        const response = await api.post("/franchise", address)
        franchise.setFranchise(response.data)
        storage.set("franchise", response.data)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (loading) return
        const value = event.target.value

        if (error) setError("")

        if (value.length == 10) {
            setLoading(true)
            _api.cep.get({
                data: { cep: value },
                callback: (response: { data: any }) => {
                    console.log(response.data)
                    if (response.data.erro) {
                        setError("CEP inválido")
                        event.target.focus()
                    } else {
                        const data: Address = response.data
                        setAddress(data)
                    }
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            setAddress(null)
        }

        setCep(value)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontSize: "6vw", textAlign: "center" }}>Localização</DialogTitle>
            <DialogContent sx={{ flexDirection: "column", gap: "3vw" }}>
                <DialogContentText sx={{}}>Digite seu CEP para encontrarmos a loja mais próxima</DialogContentText>
                <MaskedInput
                    mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    value={cep}
                    onChange={handleChange}
                    ref={ref}
                    guide={false}
                    render={(ref, props) => (
                        <TextField
                            {...props}
                            inputRef={ref}
                            label="CEP"
                            id="cep"
                            variant="standard"
                            autoFocus
                            inputMode="numeric"
                            InputLabelProps={{ sx: { fontSize: "8vw" } }}
                            InputProps={{ sx: { fontSize: "8vw" } }}
                            inputProps={{ sx: { textAlign: "center" } }}
                            error={!!error}
                            helperText={error}
                            FormHelperTextProps={{ sx: { fontSize: "4vw" } }}
                        />
                    )}
                />
                {loading && (
                    <Box sx={{ width: 1, justifyContent: "center", padding: 1 }}>
                        <CircularProgress color="primary" />
                    </Box>
                )}
                {address && (
                    <Box className="cep-container" style={{ flexDirection: "column", gap: "2vw" }}>
                        <p>Bairro: {address.bairro}</p>
                        <p>Logradouro: {address.logradouro}</p>
                        <p>Cidade: {address.localidade}</p>
                        <Button onClick={saveAddress} variant="contained">
                            OK
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}
