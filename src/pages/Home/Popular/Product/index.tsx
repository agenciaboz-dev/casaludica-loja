import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import { CurrencyText } from '../../../../components/CurrencyText';
import { Product as ProductType } from '../../../../definitions/products';
import { useCart } from '../../../../hooks/useCart';
import { useColors } from '../../../../hooks/useColors';
import { ReactComponent as CartIcon } from '../../../../images/cart.svg'

interface ProductProps {
    product:ProductType
}

export const Product:React.FC<ProductProps> = ({ product }) => {
    const cart = useCart()
    const colors = useColors()
    
    return (
        <div className='Product-Component' style={{backgroundImage: `url("${product.cover}")`}} >
            {/* <Avatar src={product.cover} sx={{width: '30vw', height: '30vw'}} /> */}
            <div className="container">
                <div className="text">
                    <p className="name">{product.name}</p>
                    <CurrencyText value={product.price} color={colors.pink} />
                </div>
                <IconButton sx={{backgroundColor: colors.primary, width: '9vw', height: '9vw'}} onClick={() => cart.add(product)} >
                    <CartIcon />
                </IconButton>
            </div>
        </div>
    )
}