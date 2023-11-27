import { Avatar, Box, Button, Drawer } from '@mui/material'
import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useMenuLinks } from '../../hooks/useMenuLinks'
import { LinkContainer } from './LinkContainer'
// import './style.scss'
import { useColors } from '../../hooks/useColors'
import { useUser } from "../../hooks/useUser"
import { LoginContainer } from "./LoginContainer"

interface MenuProps {
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
}

export const Menu: React.FC<MenuProps> = ({ isOpen, setOpen }) => {
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
                    width: "80vw"
                }
            }}>
            <Box
                className="profile"
                style={{
                    backgroundColor: colors.primary,
                    padding: "10vw 5vw",
                    gap: "5vw"
                }}>
                {user ? (
                    <>
                        <Avatar sx={{ width: "20vw", height: "20vw" }} src={user.profilePicUrl} />
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
                                    fontSize: "4vw"
                                }}>
                                {user.name}
                            </h3>
                            <p
                                className="email"
                                style={{
                                    fontSize: "3vw"
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
            <Box
                className="links"
                style={{
                    flexDirection: "column",
                    padding: "3vw 8vw",
                    gap: "4vw"
                }}>
                {links.map((link) => (
                    <LinkContainer key={link.id} link={link} />
                ))}
                <Button
                    variant="contained"
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
