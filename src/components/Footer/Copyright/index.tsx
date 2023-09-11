import { Box } from '@mui/material';
import React from 'react';
import { useColors } from '../../../hooks/useColors';

interface CopyrightProps {
    
}

export const Copyright:React.FC<CopyrightProps> = ({  }) => {
    const colors = useColors()
    
    return (
        <Box className='Copyright-Component' style={{
            margin: "10vw 0",
            width: "100%",
            flexDirection: "column",
            textAlign: "center",
            color: colors.primary
        }}>
            <p>2023 © Direitos Reservados</p>
            <p>Powered By BOZ</p>
        </Box>
    )
}