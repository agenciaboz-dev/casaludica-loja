import { useContext, useState, useEffect } from 'react'
import CartContext from "../contexts/cartContext"

export const useCart = () => {
    const [total, setTotal] = useState(0)

    const cartContext = useContext(CartContext)
    const cart = cartContext.value

    const remove = (product: Product) => {
        cartContext.setValue({ ...cart, products: cart.products?.filter((item) => item.id != product.id) })
    }

    const quantity = (product: Product, quantity: number) => {
        console.log({ quantity })
        if (quantity < 0 && product.quantity == 1) return
        const products: Product[] = JSON.parse(JSON.stringify(cart.products))
        products.map((item) => {
            if (item.id == product.id) {
                if (item.quantity + quantity < (product.stock || 0)) {
                    item.quantity = item.quantity + quantity
                }
            }
        })
        cartContext.setValue({ ...cart, products })
    }

    const add = (product: Product) => {
        if (cart.products.filter((item) => item.id == product.id).length != 0) {
            quantity(product, Number(product.quantity) || 1)
        } else {
            cartContext.setValue({
                ...cart,
                products: [...(cart.products || []), { ...product, quantity: product.quantity || 1 }],
            })
        }

        setTimeout(() => cartContext.setOpen(true), 300)
    }

    const reset = () => {
        cartContext.setValue({ ...cart, products: [] })
    }

    useEffect(() => {
        let sum = 0
        cart.products?.map((product) => (sum += product.price * product.quantity))
        setTotal(sum)
    }, [cart.products])

    return { products: cart.products, total, remove, quantity, add, open: cartContext.open, setOpen: cartContext.setOpen, reset }
}