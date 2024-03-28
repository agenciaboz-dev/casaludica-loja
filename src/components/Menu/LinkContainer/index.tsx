import { Box, MenuItem, useMediaQuery } from "@mui/material"
import React from "react"
import { useMenu } from "../../../hooks/useMenu"

interface LinkProps {
    link: Link
}

export const LinkContainer: React.FC<LinkProps> = ({ link }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const menu = useMenu()

    const handleMenuClick = (item: Link) => {
        item.onClick()
        menu.setOpen(false)
    }

    return (
        <MenuItem
            className="Link-Component"
            sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: 0,
                padding: isMobile ? "3vw 10vw" : "1vw 2vw",
                justifyContent: "center",
            }}
            onClick={() => handleMenuClick(link)}
        >
            <h3
                className="name"
                style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: isMobile ? "4vw" : "1.2rem",
                }}
            >
                {link.name}
            </h3>
            {link.sublinks && (
                <Box
                    className="sublinks"
                    sx={{
                        flexDirection: "column",
                        padding: isMobile ? "2vw 5vw" : "0.5vw 1vw",
                        gap: isMobile ? "2vw" : "0.5vw",
                    }}
                >
                    {link.sublinks?.map((sublink) => (
                        <p key={sublink.id} onClick={() => handleMenuClick(sublink)}>
                            {sublink.name}
                        </p>
                    ))}
                </Box>
            )}
        </MenuItem>
    )
}
