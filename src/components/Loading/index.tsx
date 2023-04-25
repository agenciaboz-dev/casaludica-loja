import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useLoading } from '../../hooks/useLoading';

interface LoadingProps {

}

export const Loading:React.FC<LoadingProps> = ({  }) => {
    const { loading } = useLoading()

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 999 }}
            open={loading}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}