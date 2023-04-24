import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import './style.scss';
import { Avatar } from '@mui/material'
import { Category, Product } from '../../../definitions/products';
import { useApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

interface CategoriesProps {
    
}

export const Categories:React.FC<CategoriesProps> = ({  }) => {
    const categories = useCategories()
    const api = useApi()
    const navigate = useNavigate()

    const search = (category:Category) => {
        api.products.category(category, (response: { data: Product[] }) => {
            console.log(response.data)
            navigate('/search', { state: { products: response.data } })
        })
    }
    
    return (
        <div className='Categories-Component' >
            <h3>Categorias</h3>
            <div className="categories-container">
                {categories.map(category => 
                    <div className="category-container" key={category.id} onClick={() => search(category)}>
                        <Avatar src={`/${category.id}`} />
                        <p>{category.name}</p>
                    </div>
                    )}
            </div>
        </div>
    )
}