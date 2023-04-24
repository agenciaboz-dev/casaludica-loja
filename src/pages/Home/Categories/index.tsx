import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import './style.scss';
import { Avatar } from '@mui/material'

interface CategoriesProps {
    
}

export const Categories:React.FC<CategoriesProps> = ({  }) => {
    const categories = useCategories()
    
    return (
        <div className='Categories-Component' >
            <h3>Categorias</h3>
            <div className="categories-container">
                {categories.map(category => 
                    <div className="category-container" key={category.id}>
                        <Avatar src={`/${category.id}`} />
                        <p>{category.name}</p>
                    </div>
                    )}
            </div>
        </div>
    )
}