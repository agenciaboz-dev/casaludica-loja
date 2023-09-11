import { Box } from '@mui/material';
import React from 'react';
import { useColors } from '../../../hooks/useColors';

interface AboutProps {
    
}

export const About:React.FC<AboutProps> = ({  }) => {
    const colors = useColors()

    const h1Style = {
        fontSize: "6vw"
    }

    const pStyle = {
        fontSize: "5vw"
    }

    const containerStyle: React.CSSProperties = {
        width: "100%",
        flexDirection: "column"
    }
    
    return (
        <Box className='About-Component' style={{
            width: "100%",
            flexDirection: "column",
            gap: "5vw",
            color: colors.primary,
            marginTop: "24vw"
        }}>
            <Box className="container" style={containerStyle}>
                <h1 style={h1Style}>Casa Lúdica</h1>
                <p style={pStyle}>Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Músicais, Playgrounds e Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys</p>
            </Box>
            <Box className="container" style={containerStyle}>
                <h1 style={h1Style}>Escritório comercial</h1>
                <p style={pStyle}>Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474</p>
            </Box>
            <Box className="container" style={containerStyle}>
                <h1 style={h1Style}>Fale com a gente</h1>
                <p style={pStyle}>(47) 99168-4299 (47)3081-4937</p>
                <p style={pStyle}>falecom@casaludica.com.br</p>
            </Box>
        </Box>
    )
}