import React from 'react';
import { Product as ProductType } from '../../../definitions/products';
import './style.scss';
import { Avatar } from '@mui/material'
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { useColors } from '../../../hooks/useColors';
import { ReactComponent as UpIcon } from '../../../images/quantity-increase.svg'
import { ReactComponent as DownIcon } from '../../../images/quantity-decrease.svg'
import { ReactComponent as RemoveIcon } from '../../../images/remove_product.svg'
import { CurrencyText } from '../../CurrencyText';

interface ProductProps {
    product: ProductType
}

export const Product:React.FC<ProductProps> = ({ product }) => {
    const colors = useColors()
    
    return (
        <div className='Product-Component' >
            <div className="top-container">
                <Avatar src={product.cover} variant={'rounded'} sx={{bgcolor: colors.primary, width: '25vw', height: '25vw', borderRadius: '5vw'}} >
                    <BrokenImageIcon sx={{width: 'auto', height: 'auto'}} />
                </Avatar>
                <div className="right-container">
                    <div className="quantity-container">
                        <UpIcon />
                        <div className="quantity">{product.quantity}</div>
                        <DownIcon />
                    </div>
                    <RemoveIcon style={{alignSelf: 'flex-start'}} />
                </div>
            </div>
            <div className="bottom-container">
                <div className="quantity-container">
                    x{product.quantity}
                </div>
                <div className="name-price">
                    <h3 className='name'>{product.name}</h3>
                    <CurrencyText value={product.price*product.quantity} />
                </div>
            </div>
        </div>
    )
}