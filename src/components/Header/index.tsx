import React, { useState } from 'react';
import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Menu } from '../Menu'
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { ReactComponent as LogoIcon } from '../../images/logo.svg'

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    
    return (
        <>
            <div className='Header-Component' >
                <IconButton color='secondary' sx={{gap: '2vw'}} onClick={() => setOpenMenu(true)}>
                    <MenuIcon sx={{width: '13vw', height: 'auto'}} />
                </IconButton>
                <LogoIcon />
                <IconButton color='secondary' sx={{gap: '2vw'}} onClick={() => setOpenCart(true)}>
                    <CartIcon />
                </IconButton>
            </div>
            <Menu isOpen={openMenu} setOpen={setOpenMenu} />

        </>
    )
}