import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Background } from "./Background"
import { Header } from "./Header"
import { SearchField } from "./SearchField"
import { Collections } from "../pages/Home/Collections"
import { Footer } from "./Footer"

interface DefaultWrapperProps {
    children?: React.ReactNode
}

export const DefaultWrapper: React.FC<DefaultWrapperProps> = ({ children }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            className="Home-Page"
            sx={{
                width: "100%",
                flexDirection: "column",
                padding: isMobile ? "0 5vw" : "0 10vw",
                gap: isMobile ? "5vw" : "2vw",
                overflowX: "hidden",
            }}
        >
            <Background />
            <Header />
            {isMobile && <SearchField />}
            <Collections />
            {children}
            <Footer />
        </Box>
    )
}
