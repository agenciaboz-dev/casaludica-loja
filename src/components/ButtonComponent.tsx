import { Button, ButtonProps, SxProps, useMediaQuery } from "@mui/material"
import React from "react"

export const ButtonComponent: React.FC<ButtonProps> = (props) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const style: SxProps = {
        borderRadius: "20vw",
        border: "none",
        color: "white",
        fontSize: isMobile ? "4vw" : "1.2rem",
        padding: isMobile ? "3vw" : "0.5vw 2vw",
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
