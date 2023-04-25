import { Avatar, Button } from '@mui/material';
import React from 'react';
import { Product as ProductType } from '../../../../definitions/products';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { useColors } from '../../../../hooks/useColors';
import { CurrencyText } from '../../../../components/CurrencyText';
import { useCart } from '../../../../hooks/useCart';

interface ProductProps {
    product: ProductType
}

export const Product:React.FC<ProductProps> = ({ product }) => {
    const colors = useColors()
    const cart = useCart()
    
    return (
        <div className='Product-Component' >
            <Avatar src={product.cover} variant={'rounded'} sx={{bgcolor: colors.primary, width: '32vw', height: '32vw', borderRadius: '5vw'}} >
                <BrokenImageIcon sx={{width: 'auto', height: 'auto'}} />
            </Avatar>
            <h2>{product.name}</h2>
            <p>{product.resume}</p>
            <CurrencyText value={product.price} color={'#686868'} style={{fontWeight: 'bold'}} />
            <Button
                onClick={() => cart.add(product)}
            	variant='contained'
                fullWidth
            	sx={{backgroundColor: colors.green, borderRadius: '10vw', fontWeight: 'bold'}}
            >Quero esse</Button>
        </div>
    )
}