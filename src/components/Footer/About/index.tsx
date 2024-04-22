import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { Newsletter } from "../Newsletter"

interface AboutProps {}

export const About: React.FC<AboutProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()

    const h2Style = {
        fontSize: isMobile ? "6vw" : "1.5rem",
    }

    const pStyle = {
        fontSize: isMobile ? "5vw" : "1.2rem",
    }

    const containerStyle: React.CSSProperties = {
        width: "100%",
        flexDirection: "column",
    }

    return (
        <Box
            className="About-Component"
            style={{
                width: "100%",
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                color: colors.primary,
                marginTop: isMobile ? "" : "",
                justifyContent: "space-between",
            }}
        >
            <Box className="container" style={containerStyle}>
                <h2 style={h2Style}>Casa Lúdica</h2>
                <p style={pStyle}>
                    Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Musicais, Playgrounds e
                    Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys
                </p>
            </Box>
            <Box className="container" style={containerStyle}>
                <h2 style={h2Style}>Escritório comercial</h2>
                <p style={pStyle}>Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474</p>
            </Box>
        </Box>
    )
}
