import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { Form, Formik } from 'formik'
import React, { useRef, useState, useEffect } from 'react'
import MaskedInput from 'react-text-mask'
import { Address } from '../../definitions/user'
import { useApi } from '../../hooks/useApi'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface CepModalProps {
	open: boolean
	setOpen: (open: boolean) => void
}

export const CepModal: React.FC<CepModalProps> = ({ open, setOpen }) => {
	const ref = useRef<MaskedInput>(null)
	const api = useApi()
	const storage = useLocalStorage()

	const [error, setError] = useState('')
	const [cep, setCep] = useState('')
	const [address, setAddress] = useState<Address | null>(null)
	const [loading, setLoading] = useState(false)

	const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
		if (reason) return
		setOpen(false)
	}

	const saveAddress = () => {
		setOpen(false)
		storage.set('address', address)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value

		if (error) setError('')

		if (value.length == 10) {
			setLoading(true)
			api.cep.get({
				data: { cep: value },
				callback: (response: { data: any }) => {
					console.log(response.data)
					if (response.data.erro) {
						setError('CEP inválido')
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
			<DialogTitle sx={{ fontSize: '6vw', textAlign: 'center' }}>Localização</DialogTitle>
			<DialogContent sx={{ flexDirection: 'column', gap: '3vw' }}>
				<DialogContentText sx={{}}>Digite seu CEP para encontrarmos a loja mais próxima</DialogContentText>
				<MaskedInput
					mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
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
							InputLabelProps={{ sx: { fontSize: '8vw' } }}
							InputProps={{ sx: { fontSize: '8vw' } }}
							inputProps={{ sx: { textAlign: 'center' } }}
							error={!!error}
							helperText={error}
							FormHelperTextProps={{ sx: { fontSize: '4vw' } }}
						/>
					)}
				/>
				{loading && <CircularProgress color="primary" sx={{ alignSelf: 'center', margin: '2vw' }} />}
				{address && (
					<div className="cep-container" style={{ flexDirection: 'column', gap: '2vw' }}>
						<p>Bairro: {address.bairro}</p>
						<p>Logradouro: {address.logradouro}</p>
						<p>Cidade: {address.localidade}</p>
						<Button onClick={saveAddress} variant="contained">
							OK
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
