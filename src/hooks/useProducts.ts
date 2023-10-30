import { useContext } from 'react'
import ProductsContext from '../contexts/productsContext'

export const useProducts = () => {
    const productsContext = useContext(ProductsContext);
    const { addProduct } = productsContext

    return { products: productsContext.value, setProducts: productsContext.setValue, add: addProduct }
}