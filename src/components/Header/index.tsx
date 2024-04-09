import React, { useEffect, useState } from 'react'
//import "./style.scss"
import MenuIcon from "@mui/icons-material/Menu"
import { IconButton, Badge, Box, useMediaQuery } from "@mui/material"
import { ReactComponent as CartIcon } from "../../images/cart.svg"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import { Cart } from "../Cart"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { CepModal } from "../CepModal"
import { SearchField } from "../../components/SearchField"
import { useMenu } from "../../hooks/useMenu"

export const Header = () => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [cepModal, setCepModal] = useState(false)

    const menu = useMenu()
    const cart = useCart()
    const navigate = useNavigate()
    const storage = useLocalStorage()

    useEffect(() => {
        if (!storage.get("address")) {
            setCepModal(true)
        }
    }, [])

    return (
        <>
            <Box
                className="Header-Component"
                sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: isMobile ? "0vw" : "1vw",
                }}
            >
                <IconButton
                    color="secondary"
                    sx={{
                        fontFamily: "BowlbyOneSC",
                        fontWeight: "400",
                        fontSize: isMobile ? "4vw" : "1rem",
                        justifyContent: "start",
                    }}
                    onClick={() => menu.setOpen(true)}
                >
                    <MenuIcon sx={{ height: isMobile ? "10vw" : "2.5vw", width: isMobile ? "10vw" : "2.5vw" }} />
                    {!isMobile && "Menu"}
                </IconButton>

                <LogoIcon
                    onClick={() => navigate("/")}
                    style={{
                        flex: 0.4,
                        cursor: "pointer",
                    }}
                />
                {!isMobile && <SearchField />}
                <Box
                    sx={{
                        justifyContent: "flex-end",
                    }}
                >
                    <Badge
                        badgeContent={cart.products?.length || 0}
                        color="primary"
                        sx={{
                            //top:"3vw",
                            right: "1vw",
                        }}
                    >
                        <IconButton color="secondary" sx={{ padding: 0 }} onClick={() => cart.setOpen(true)}>
                            <CartIcon
                                style={{
                                    flex: 1,
                                    height: isMobile ? "10vw" : "3vw",
                                    width: isMobile ? "10vw" : "3vw",
                                }}
                            />
                        </IconButton>
                    </Badge>
                </Box>
            </Box>
            <Loading />

            <CepModal open={cepModal} setOpen={setCepModal} />
        </>
    )
}
