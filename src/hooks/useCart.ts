import { useContext, useState, useEffect } from 'react'
import CartContext from '../contexts/cartContext'
import { Product } from '../definitions/products';

export const useCart = () => {
    const [total, setTotal] = useState(0)

    const cartContext = useContext(CartContext);
    const cart = cartContext.value
    
    const remove = (product:Product) => {
        cartContext.setValue({...cart, products: cart.products?.filter(item => item.id != product.id)})
    }

    useEffect(() => {
        let sum = 0
        cart.products?.map(product => sum += (product.price * product.quantity))
        setTotal(sum)
    }, [cart.products])

    return { products: cart.products, total, remove }
}