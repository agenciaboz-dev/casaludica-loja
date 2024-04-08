import React from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { useFranchise } from "../hooks/useFranchise"
import unmask from "../tools/unmask"
import image from "../images/whatsapp_alt.svg"

interface ZapProps {}

export const Zap: React.FC<ZapProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { franchise } = useFranchise()

    const url = `https://wa.me/55${unmask(franchise?.phone || "")}`
    const offset = isMobile ? 5 : 10
    const size = isMobile ? "14vw" : "4vw"

    return (
        <IconButton sx={{ position: "fixed", bottom: offset, right: offset }} color="success" onClick={() => window.open(url, "_blank")?.focus()}>
            <img src={image} style={{ width: size, height: size }} />
        </IconButton>
    )
}
