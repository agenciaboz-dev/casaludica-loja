import { Button, ButtonProps, SxProps } from "@mui/material"
import React from "react"

export const ButtonComponent: React.FC<ButtonProps> = (props) => {
    const style: SxProps = {
        borderRadius: "20vw",
        border: "none",
        color: "white",
        padding: "3vw",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "BowlbyOneSC",
    }

    return (
        <Button {...props} variant="contained" color="success" sx={{ ...style }}>
            {props.children}
        </Button>
    )
}
