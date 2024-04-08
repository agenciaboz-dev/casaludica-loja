import React from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { useFranchise } from "../hooks/useFranchise"
import { WhatsApp } from "@mui/icons-material"
import unmask from "../tools/unmask"

interface ZapProps {}

export const Zap: React.FC<ZapProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { franchise } = useFranchise()

    const url = `https://wa.me/55${unmask(franchise?.phone || "")}`
    console.log(url)
    const offset = isMobile ? 5 : 10
    const size = isMobile ? "15vw" : "4vw"

    return (
        <IconButton sx={{ position: "fixed", bottom: offset, right: offset }} color="success" onClick={() => window.open(url, "_blank")?.focus()}>
            <WhatsApp sx={{ width: size, height: size }} />
        </IconButton>
    )
}
