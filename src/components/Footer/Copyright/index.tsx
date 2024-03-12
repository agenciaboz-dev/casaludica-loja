import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { app_version } from "../../../version"

interface CopyrightProps {}

export const Copyright: React.FC<CopyrightProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()

    return (
        <Box
            className="Copyright-Component"
            style={{
                margin: isMobile ? "10vw 0" : "0 0 5vw",
                width: "100%",
                flexDirection: "column",
                textAlign: "center",
                color: colors.primary,
            }}
        >
            <p>2023 © Direitos Reservados - {app_version}</p>
            <p>Powered By BOZ</p>
        </Box>
    )
}
