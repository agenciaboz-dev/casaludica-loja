import React, { useEffect, useState } from 'react'
//import "./style.scss"
import MenuIcon from "@mui/icons-material/Menu"
import { IconButton, Badge, Box } from "@mui/material"
import { Menu } from "../Menu"
import { ReactComponent as CartIcon } from "../../images/cart.svg"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import { Cart } from "../Cart"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { CepModal } from "../CepModal"

export const Header = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [cepModal, setCepModal] = useState(false)

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
                    paddingTop: "5vw",
                }}
            >
                <IconButton
                    color="secondary"
                    sx={{ gap: "2vw", padding: 0, fontFamily: "BowlbyOneSC", fontWeight: "400", fontSize: "4vw", flex: 0.3 }}
                    onClick={() => setOpenMenu(true)}
                >
                    <MenuIcon />
                    Menu
                </IconButton>
                <LogoIcon onClick={() => navigate("/")} style={{ flex: 0.3 }} />
                <Box sx={{ flex: 0.3, justifyContent: "flex-end" }}>
                    <Badge
                        badgeContent={cart.products?.length || 0}
                        color="primary"
                        sx={{
                            //top:"3vw",
                            right: "1vw",
                        }}
                    >
                        <IconButton color="secondary" sx={{ gap: "2vw" }} onClick={() => cart.setOpen(true)}>
                            <CartIcon style={{ flex: 1 }} />
                        </IconButton>
                    </Badge>
                </Box>
            </Box>
            <Menu isOpen={openMenu} setOpen={setOpenMenu} />
            <Cart isOpen={cart.open} setOpen={cart.setOpen} />
            <Loading />

            <CepModal open={cepModal} setOpen={setCepModal} />
        </>
    )
}
