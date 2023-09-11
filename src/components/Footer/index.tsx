import React from 'react';
import { About } from './About';
import { Copyright } from './Copyright';
import { Newsletter } from './Newsletter';
import { Social } from './Social';
import './style.scss';
import { Box } from '@mui/material';

interface FooterProps {
    
}

export const Footer:React.FC<FooterProps> = ({  }) => {
    
    return (
        <Box className='Footer-Component' style={{
            flexDirection: "column",
            width: "100%",
            gap: "5vw"
        }}>
            <Social />
            <About />
            <Newsletter />
            <Copyright />
        </Box>
    )
}