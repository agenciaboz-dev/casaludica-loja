import { useContext, useState, useEffect } from 'react'
import CartContext from '../contexts/cartContext'

export const useCart = () => {
    const cartContext = useContext(CartContext);
    const cart = cartContext.value
    
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        cart.products?.map(product => sum += (product.price * product.quantity))
        setTotal(sum)
    }, [cart.products])

    return { products: cart.products, total }
}