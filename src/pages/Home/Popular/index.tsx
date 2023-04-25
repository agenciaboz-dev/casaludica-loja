import React, { useEffect, useState } from 'react';
import { Product } from '../../../definitions/products';
import { useApi } from '../../../hooks/useApi';
import { Product as Container } from './Product';
import './style.scss';

interface PopularProps {
    
}

export const Popular:React.FC<PopularProps> = ({  }) => {
    const api = useApi()

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        api.products.popular((response: { data:Product[] }) => {
            setProducts(response.data)
        })
    }, [])
    
    return (
        <div className='Popular-Component' >
            <h3>Mais curtidos pela galerinha</h3>
            <div className="products-container">
                {products.map(product => <Container key={product.id} product={product} />)}
            </div>
        </div>
    )
}