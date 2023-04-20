import React, { useState } from 'react';
import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Badge } from '@mui/material';
import { Menu } from '../Menu'
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { ReactComponent as LogoIcon } from '../../images/logo.svg'
import { Cart } from '../Cart';
import { useCart } from '../../hooks/useCart';

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const [openCart, setOpenCart] = useState(false)

    const cart = useCart()
    
    return (
        <>
            <div className='Header-Component' >
                <IconButton color='secondary' sx={{gap: '2vw'}} onClick={() => setOpenMenu(true)}>
                    <MenuIcon sx={{width: '13vw', height: 'auto'}} />
                </IconButton>
                <LogoIcon />
                <Badge badgeContent={cart.products?.length || 0} color='primary'>
                    <IconButton color='secondary' sx={{gap: '2vw'}} onClick={() => setOpenCart(true)}>
                        <CartIcon />
                    </IconButton>
                </Badge>
            </div>
            <Menu isOpen={openMenu} setOpen={setOpenMenu} />
            <Cart isOpen={openCart} setOpen={setOpenCart} />
        </>
    )
}