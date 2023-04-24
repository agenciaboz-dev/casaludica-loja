import { Avatar } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { SearchField } from '../../components/SearchField';
import { Product } from '../../definitions/products';
import { Collections } from '../Home/Collections';
import './style.scss';

interface ResultsProps {
    
}

export const Results:React.FC<ResultsProps> = ({  }) => {
    const location = useLocation()
    const products = location.state.products || []
    
    return (
        <div className='Results-Page' >
            <Background />
            <Header />

            <SearchField />
            <Collections />
            
            {products.map((product:Product) => 
            <div style={{flexDirection: 'column', alignItems: 'center'}} key={product.id}>
                <h1>{product.name}</h1>
                <Avatar src={product.cover} sx={{width: '50vw', height: 'auto'}} />
                <h3>{product.resume}</h3>
                <p>{product.description}</p>
            </div>)}
        </div>
    )
}