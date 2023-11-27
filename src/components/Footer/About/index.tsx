import { Box, useMediaQuery } from "@mui/material"
import React from "react"
import { useColors } from "../../../hooks/useColors"
import { Newsletter } from "../Newsletter"

interface AboutProps {}

export const About: React.FC<AboutProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()

    const h1Style = {
        fontSize: isMobile ? "6vw" : "2.5vw",
    }

    const h2Style = {
        fontSize: isMobile ? "6vw" : "2vw",
    }

    const pStyle = {
        fontSize: isMobile ? "5vw" : "1.5vw",
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
                marginTop: isMobile ? "24vw" : "",
            }}
        >
            <Box className="container" style={containerStyle}>
                <h1 style={h1Style}>Casa Lúdica</h1>
                <p style={pStyle}>
                    Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Músicais, Playgrounds e
                    Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys
                </p>
            </Box>
            <Box className="container" style={containerStyle}>
                <h2 style={h2Style}>Escritório comercial</h2>
                <p style={pStyle}>Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474</p>
            </Box>
            {isMobile && (
                <Box className="container" style={containerStyle}>
                    <h2 style={h2Style}>Fale com a gente</h2>
                    <p style={pStyle}>(47) 99168-4299 (47)3081-4937</p>
                    <p style={pStyle}>falecom@casaludica.com.br</p>
                    <p style={{ ...pStyle, marginTop: "4vw" }}>Assine a nossa Newsletter e receba novidades e promoções!</p>
                </Box>
            )}
            {!isMobile && (
                <Box>
                    <Box className="container" style={containerStyle}>
                        <h2 style={h2Style}>Fale com a gente</h2>
                        <p style={pStyle}>(47) 99168-4299 (47)3081-4937</p>
                        <p style={pStyle}>falecom@casaludica.com.br</p>
                        <p style={{ ...pStyle, marginTop: "1.5vw" }}>Assine a nossa Newsletter e receba novidades e promoções!</p>
                    </Box>
                    <Newsletter />
                </Box>
            )}
        </Box>
    )
}
