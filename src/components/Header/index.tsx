import React from 'react';
import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export const Header = () => {
    
    return (
        <div className='Header-Component' >
            <IconButton color='secondary' sx={{gap: '2vw'}}>
                <MenuIcon sx={{width: '13vw', height: 'auto'}} />
                <p>Menu</p>
            </IconButton>
        </div>
    )
}