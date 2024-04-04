import { Avatar, Box, Button, Drawer, IconButton, MenuItem, SwipeableDrawer, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useMenuLinks } from "../../hooks/useMenuLinks"
import { LinkContainer } from "./LinkContainer"
// import './style.scss'
import { useColors } from "../../hooks/useColors"
import { useUser } from "../../hooks/useUser"
import { LoginContainer } from "./LoginContainer"
import { useMenu } from "../../hooks/useMenu"
import { useNavigate } from "react-router-dom"
import logoIconPNG from "../../images/cl-logo.png"
import { LoginMenu } from "../../pages/LoginMenu"
import { ReactComponent as InstagramIcon } from "../../images/socials/instagram.svg"
import { ReactComponent as FacebookIcon } from "../../images/socials/facebook.svg"
import { ReactComponent as YoutubeIcon } from "../../images/socials/youtube.svg"
import { ReactComponent as WhatsappIcon } from "../../images/socials/whatsapp.svg"
import { ReactComponent as Logo } from "../../images/logo.svg"
import { Padding } from "@mui/icons-material"

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const links = useMenuLinks()
    const storage = useLocalStorage()
    const colors = useColors()
    const navigate = useNavigate()

    const { open: isOpen, setOpen } = useMenu()
    const { user } = useUser()
    const [login, setLogin] = useState(false)
    const [havePassword, setHavePassword] = useState(false)
    const [loginString, setLoginString] = useState("")

    const closeMenu = () => {
        setOpen(false)
    }

    const buttonStyle = {
        padding: 0,
        color: "white",
        textTransform: "unset",
        textDecoration: "underline",
        width: "fit-content",
    }
    const socials = {
        instagram: "https://www.instagram.com/casaludica/",
        whatsapp: "https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!",
        facebook: "https://www.facebook.com/casaludica.com.br",
        youtube: "https://www.youtube.com/@casaludica6482",
    }

    return (
        <SwipeableDrawer
            onOpen={() => setOpen(true)}
            keepMounted
            anchor={"left"}
            open={isOpen}
            onClose={closeMenu}
            PaperProps={{
                className: "Menu-Component",
                style: {
                    width: isMobile ? "80vw" : "30vw",
                },
            }}
        >
            <Box
                className="profile"
                style={{
                    backgroundColor: colors.primary,
                    padding: isMobile ? "7.5vw 5vw" : "2vw 1vw",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                {user ? (
                    <Box
                        sx={{ display: "contents" }}
                        onClick={() => {
                            navigate("/profile")
                            closeMenu()
                        }}
                    >
                        <Avatar
                            sx={{ width: isMobile ? "20vw" : "5vw", height: isMobile ? "20vw" : "5vw", margin: "auto 0" }}
                            src={user.profilePicUrl}
                        />
                        <Box
                            className="info"
                            sx={{
                                flexDirection: "column",
                                justifyContent: "center",
                                color: "white",
                                overflow: "hidden",
                                gap: isMobile ? "1vw" : "0.5vw",
                            }}
                        >
                            <h3
                                className="name"
                                style={{
                                    fontSize: isMobile ? "4vw" : "1.5rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {user.name}
                            </h3>
                            <p
                                className="email"
                                style={{
                                    fontSize: isMobile ? "3vw" : "1rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {user.email}
                            </p>
                            <h4
                                className="link"
                                style={{
                                    textDecoration: "underline",
                                }}
                            >
                                Editar Perfil
                            </h4>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: "contents" }}>
                        <Avatar
                            sx={{
                                width: isMobile ? "20vw" : "5vw",
                                height: isMobile ? "20vw" : "5vw",
                                margin: "auto 0",
                                backgroundColor: "white",
                                padding: isMobile ? "1vw" : 0,
                            }}
                            src={logoIconPNG}
                        />
                        <Box
                            className="info"
                            sx={{
                                flexDirection: "column",
                                justifyContent: "center",
                                color: "white",
                                overflow: "hidden",
                            }}
                        >
                            <h3
                                className="name"
                                style={{
                                    fontSize: isMobile ? "4vw" : "1.5rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                Já tem uma conta?
                            </h3>
                            <Box
                                sx={{
                                    flexDirection: isMobile ? "column" : "row",
                                    gap: isMobile ? 0 : "1vw",
                                }}
                            >
                                <Button
                                    sx={buttonStyle}
                                    onClick={() => {
                                        setLogin(true)
                                        // closeMenu()
                                    }}
                                >
                                    Faça o login
                                </Button>
                                <Box
                                    sx={{
                                        alignItems: "end",
                                        gap: "10px",
                                    }}
                                >
                                    <p style={{ fontSize: isMobile ? "2.5vw" : "1vw", paddingBottom: "2px" }}>ou</p>
                                    <Button
                                        sx={buttonStyle}
                                        onClick={() => {
                                            navigate("/signup")
                                            closeMenu()
                                        }}
                                    >
                                        Cadastre-se
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            {login ? (
                <Box
                    sx={{
                        flexDirection: "column",
                        paddingTop: isMobile ? "3vw" : "3vw",
                        padding: "8vw",
                        gap: "8vw",
                        width: 1,
                    }}
                >
                    {!havePassword ? (
                        <>
                            <p style={{ fontSize: "1.3rem", fontFamily: "BowlbyOneSC", textAlign: "center" }}>
                                ACESSE SUA CONTA
                            </p>
                            <LoginContainer setHavePassword={setHavePassword} setLoginString={setLoginString} />
                        </>
                    ) : (
                        <LoginMenu
                            setLogin={setLogin}
                            loginString={loginString}
                            setLoginString={setLoginString}
                            setHavePassword={setHavePassword}
                        />
                    )}
                    <Box sx={{ width: 1, alignItems: "center", flexDirection: "column", gap: "2vw" }}>
                        <Box
                            className="icons-container"
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            <IconButton onClick={() => window.open(socials.instagram, "_blank")?.focus()} size="small">
                                <InstagramIcon style={{ width: isMobile ? "16vw" : "4vw", padding: 0 }} />
                            </IconButton>
                            <IconButton onClick={() => window.open(socials.facebook, "_blank")?.focus()} size="small">
                                <FacebookIcon style={{ width: isMobile ? "15vw" : "4vw" }} />
                            </IconButton>
                            <IconButton onClick={() => window.open(socials.youtube, "_blank")?.focus()} size="small">
                                <YoutubeIcon style={{ width: isMobile ? "15vw" : "4vw" }} />
                            </IconButton>
                            <IconButton onClick={() => window.open(socials.whatsapp, "_blank")?.focus()} size="small">
                                <WhatsappIcon style={{ width: isMobile ? "15vw" : "4vw" }} />
                            </IconButton>
                        </Box>
                        <Logo style={{ width: isMobile ? "100%" : "20vw" }} />
                        <Box sx={{ flexDirection: "column", gap: 0 }}>
                            <p style={{ fontSize: "0.7rem", color: "black", marginTop: "2vw" }}>
                                Registrado por Casa Lúdica®
                            </p>
                            <p style={{ fontSize: "0.7rem", color: "black", marginTop: "2vw" }}>
                                Todos os direitos reservados.
                            </p>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ flexDirection: "column", paddingTop: isMobile ? "3vw" : "1vw" }}>
                    {links.map((link) => (
                        <LinkContainer key={link.id} link={link} />
                    ))}
                    <Button
                        variant="contained"
                        sx={{ margin: "1vw 5vw" }}
                        onClick={() => {
                            storage.set("address", null)
                            storage.set("franchise", null)
                            window.location.href = "/"
                        }}
                    >
                        Resetar endereço
                    </Button>
                </Box>
            )}
        </SwipeableDrawer>
    )
}
