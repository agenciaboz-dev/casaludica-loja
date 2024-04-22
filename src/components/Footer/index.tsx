import React from 'react';
import { About } from './About';
import { Copyright } from './Copyright';
import { Newsletter } from './Newsletter';
import { Social } from './Social';
// import './style.scss';
import { Box, useMediaQuery } from "@mui/material"

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            className="Footer-Component"
            style={{
                flexDirection: "column",
                width: "100%",
                gap: isMobile ? "5vw" : "2vw",
            }}
        >
            <Social />
            <Box
                sx={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "5vw" : "7vw",
                }}
            >
                <About />
                <Newsletter />
            </Box>
            <Copyright />
        </Box>
    )
}