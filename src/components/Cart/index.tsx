import { Drawer } from '@mui/material';
import React from 'react';
import './style.scss';
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { useCart } from '../../hooks/useCart';
import { CurrencyText } from '../CurrencyText';
import { Product } from './Product';

interface CartProps {
    isOpen: boolean
    setOpen: (value:boolean) => void
}

export const Cart:React.FC<CartProps> = ({ isOpen, setOpen }) => {
    const cart = useCart()

    const closeMenu = () => {
        setOpen(false)
    }
    
    return (
        <Drawer
            anchor={'right'}
            open={isOpen}
            onClose={closeMenu}
            PaperProps={{className: 'Cart-Component'}}
            >
            <div className="info">
                <CartIcon />
                <div className="text">
                    <h3>SEU CARRINHO</h3>
                    <p>Valor total: {<CurrencyText value={cart.total} />}</p>
                </div>
                <div className="amount-circle">
                    <h3>{cart.products?.length || 0}</h3>
                </div>
            </div>
            <div className="product-list">
                {cart.products?.map(product => <Product key={product.id} product={product} />)}
            </div>
            <div className="button-container">
                <button style={{width: '100%'}}>Finalizar compra</button>
            </div>
        </Drawer>
    )
}