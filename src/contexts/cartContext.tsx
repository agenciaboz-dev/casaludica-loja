import { createContext, useState } from 'react';
import React, { useEffect } from 'react';
import { Cart } from '../definitions/cart';

interface CartContextValue {
    value: Cart;
    setValue: (value:Cart) => void;
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export default CartContext;

export const CartProvider:React.FC<CartProviderProps> = ({children}) => {
    const [value, setValue] = useState<Cart>({ 
        products: [{
            id: 1,
            cover: '',
            name: 'Produto Teste',
            price: 25.10,
            quantity: 1,
        },
        {
            id: 2,
            cover: '',
            name: 'Produtinho',
            price: 5.40,
            quantity: 1,
        },
        {
            id: 3,
            cover: '',
            name: 'Novo Teste',
            price: 250.10,
            quantity: 1,
        }], 
    })

    useEffect(() => {
        console.log({cart: value})
    }, [value])

    return (
         <CartContext.Provider value={{value, setValue}}>
              {children}
         </CartContext.Provider>
    )
}