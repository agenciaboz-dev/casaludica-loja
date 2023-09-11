import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom"

interface LinkProps {
    link: Link
}

export const LinkContainer:React.FC<LinkProps> = ({ link }) => {

    const navigate = useNavigate()
    
    return (
        <Box className='Link-Component' style={{
            flexDirection: "column"
        }}>
            <h3 className='name' style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                fontSize: "4vw"
            }} onClick={() => navigate(link.location)}>{link.name}</h3>
            <Box className="sublinks" style={{
                flexDirection: "column",
                padding: "2vw 5vw",
                gap: "2vw"
            }}>
                {link.sublinks?.map(sublink => <p key={sublink.id} onClick={() => navigate(sublink.location)}>{sublink.name}</p>)}
            </Box>
        </Box>
    )
}