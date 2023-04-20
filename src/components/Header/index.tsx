import React, { useState } from 'react';
import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Menu } from '../Menu'

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false)
    
    return (
        <>
            <div className='Header-Component' >
                <IconButton color='secondary' sx={{gap: '2vw'}} onClick={() => setOpenMenu(true)}>
                    <MenuIcon sx={{width: '13vw', height: 'auto'}} />
                    <p>Menu</p>
                </IconButton>
            </div>
            <Menu isOpen={openMenu} setOpen={setOpenMenu} />
        </>
    )
}