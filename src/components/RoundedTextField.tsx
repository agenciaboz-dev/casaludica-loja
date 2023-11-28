import React from "react"
import { Box, TextField, TextFieldProps } from "@mui/material"

interface RoundedTextFieldProps extends TextFieldProps<"standard"> {}

export const RoundedTextField: React.FC<RoundedTextFieldProps> = (props) => {
    return <TextField {...props} InputProps={{ sx: { borderRadius: "10vw" }, ...props.InputProps }} />
}
