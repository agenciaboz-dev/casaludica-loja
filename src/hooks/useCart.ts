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
    
    const quantity = (product:Product, quantity:number) => {
        const original_quantity = product.quantity
        if (quantity < 0 && original_quantity == 1) return
        const products = cart.products?.filter(item => item.id != product.id)
        products?.push({...product, quantity: original_quantity+quantity})
        cartContext.setValue({...cart, products})
    }

    useEffect(() => {
        let sum = 0
        cart.products?.map(product => sum += (product.price * product.quantity))
        setTotal(sum)
    }, [cart.products])

    return { products: cart.products, total, remove, quantity }
}