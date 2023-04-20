import { Avatar, Drawer } from '@mui/material';
import React from 'react';
import './style.scss';

interface MenuProps {
    isOpen: boolean
    setOpen: (isOpen:boolean) => void
}

export const Menu:React.FC<MenuProps> = ({ isOpen, setOpen }) => {

    const closeMenu = () => {
        setOpen(false)
    }
    
    return (
        <Drawer
            anchor={'left'}
            open={isOpen}
            onClose={closeMenu}
            PaperProps={{className: 'Menu-Component'}}
            >
            <div className="profile">
                <Avatar sx={{width: '20vw', height: '20vw'}} src="/broken-image.jpg" />
                <div className="info">
                    <h3 className='name'>CASA LÚDICA ADM</h3>
                    <p className='email'>casaludica@casaludica.com.br</p>
                    <h5 className='link'>Editar Perfil</h5>
                </div>
            </div>
        </Drawer>
    )
}