import { Button, ButtonProps, SxProps } from "@mui/material"
import React from "react"

export const ButtonComponent: React.FC<ButtonProps> = (props) => {
    const style: SxProps = {
        display: "flex",
        borderRadius: "20vw",
        border: "none",
        backgroundColor: "#34A853",
        color: "white",
        padding: "3vw",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
    }
    return (
        <Button {...props} sx={style}>
            {props.children}
        </Button>
    )
}
