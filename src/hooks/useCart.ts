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
        if (quantity < 0 && product.quantity == 1) return
        const products:Product[] = JSON.parse(JSON.stringify(cart.products))
        products.map(item => {
            if (item.id == product.id) item.quantity = product.quantity + quantity
        })
        cartContext.setValue({...cart, products})
    }

    const add = (product:Product) => {
        cartContext.setValue({...cart, products: [...cart.products || [], {...product, quantity: 1}]})
    }

    useEffect(() => {
        let sum = 0
        cart.products?.map(product => sum += (product.price * product.quantity))
        setTotal(sum)
    }, [cart.products])

    return { products: cart.products, total, remove, quantity, add }
}