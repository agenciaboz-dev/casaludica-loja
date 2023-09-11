import { Box } from '@mui/material';
import React from 'react';
// import './style.scss';

export const Background = () => {
    
    return (
        <Box className='Background-Component' style={{
            width: "100%",
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            flexDirection: "column",
            }} >
            <Box className="blue-gradient" style={{
                width: "100%",
                background: "linear-gradient(90deg, #363775 1.58%, #B6C8D8 100%)",
                height: "65vw",
            }}></Box>
        </Box>
    )
}