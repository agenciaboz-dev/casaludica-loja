import { Avatar, Box, Button, Drawer, useMediaQuery } from "@mui/material"
import React from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useMenuLinks } from "../../hooks/useMenuLinks"
import { LinkContainer } from "./LinkContainer"
// import './style.scss'
import { useColors } from "../../hooks/useColors"
import { useUser } from "../../hooks/useUser"
import { LoginContainer } from "./LoginContainer"

interface MenuProps {
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
}

export const Menu: React.FC<MenuProps> = ({ isOpen, setOpen }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const links = useMenuLinks()
    const storage = useLocalStorage()
    const colors = useColors()

    const { user } = useUser()

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <Drawer
            keepMounted
            anchor={"left"}
            open={isOpen}
            onClose={closeMenu}
            PaperProps={{
                className: "Menu-Component",
                style: {
                    width: isMobile ? "80vw" : "25vw"
                }
            }}>
            <Box
                className="profile"
                style={{
                    backgroundColor: colors.primary,
                    padding: isMobile ? "10vw 5vw" : "2vw 1vw",
                    gap: isMobile ? "5vw" : "2vw"
                }}>
                {user ? (
                    <>
                        <Avatar sx={{ width: isMobile ? "20vw" : "3vw", height: isMobile ? "20vw" : "3vw" }} src={user.profilePicUrl} />
                        <Box
                            className="info"
                            style={{
                                flexDirection: "column",
                                justifyContent: "spaceBetween",
                                color: "white"
                            }}>
                            <h3
                                className="name"
                                style={{
                                    fontSize: isMobile ? "4vw" : "1.5rem"
                                }}>
                                {user.name}
                            </h3>
                            <p
                                className="email"
                                style={{
                                    fontSize: isMobile ? "3vw" : "1rem"
                                }}>
                                {user.email}
                            </p>
                            <h5
                                className="link"
                                style={{
                                    textDecoration: "underline"
                                }}>
                                Editar Perfil
                            </h5>
                        </Box>
                    </>
                ) : (
                    <LoginContainer />
                )}
            </Box>
            <Box sx={{ flexDirection: "column", paddingTop: "3vw" }}>
                {links.map((link) => (
                    <LinkContainer key={link.id} link={link} />
                ))}
                <Button
                    variant="contained"
                    sx={{ margin: "0 5vw" }}
                    onClick={() => {
                        storage.set("address", null)
                        window.location.href = "/"
                    }}>
                    Resetar endereço
                </Button>
            </Box>
        </Drawer>
    )
}
