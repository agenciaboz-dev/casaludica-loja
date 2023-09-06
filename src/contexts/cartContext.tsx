import { createContext, useState } from 'react';
import React, { useEffect } from "react"

interface CartContextValue {
    value: Cart
    setValue: (value: Cart) => void
    open: boolean
    setOpen: (open: boolean) => void
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

export default CartContext

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<Cart>({
        products: [],
    })

    useEffect(() => {
        console.log({ cart: value })
    }, [value])

    return <CartContext.Provider value={{ value, setValue, open, setOpen }}>{children}</CartContext.Provider>
}