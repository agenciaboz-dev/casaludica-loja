import { Box, MenuItem, useMediaQuery } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

interface LinkProps {
    link: Link
}

export const LinkContainer: React.FC<LinkProps> = ({ link }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()

    return (
        <MenuItem
            className="Link-Component"
            sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: 0,
                padding: "3vw 10vw",
                justifyContent: "center"
            }}>
            <h3
                className="name"
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: isMobile ? "4vw" : "1.2rem"
                }}
                onClick={() => navigate(link.location)}>
                {link.name}
            </h3>
            {link.sublinks && (
                <Box
                    className="sublinks"
                    sx={{
                        flexDirection: "column",
                        padding: isMobile ? "2vw 5vw" : "0.5vw 1vw",
                        gap: isMobile ? "2vw" : "0.5vw"
                    }}>
                    {link.sublinks?.map((sublink) => (
                        <p key={sublink.id} onClick={() => navigate(sublink.location)}>
                            {sublink.name}
                        </p>
                    ))}
                </Box>
            )}
        </MenuItem>
    )
}
