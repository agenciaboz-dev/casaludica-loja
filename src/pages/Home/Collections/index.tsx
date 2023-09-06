import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from "../../../definitions/products"
import { useApi } from '../../../hooks/useApi';
import { useCollections } from '../../../hooks/useCollections';
import { useLoading } from '../../../hooks/useLoading';
import './style.scss'

interface CollectionProps {
    collection: Collection
    icon: any
}

export const Collections = ({  }) => {

    const Collection:React.FC<CollectionProps> = ({ collection, icon: IconComponent }) => {
        return (
            <div style={{ flexDirection: 'column', alignItems: 'center' }} onClick={() => handleClick(collection)} >
                <IconComponent />
                <p>{collection.name}</p>
            </div>
        )
    }

    const handleClick = (collection:Collection) => {
        navigate(`/search/collection/${collection.categories}`)
    }

    const { setLoading } = useLoading()
    const collections = useCollections()
    const api = useApi()
    const navigate = useNavigate()
    
    return (
        <div className='Collections-Component' >
            <h3>Coleções</h3>
            <div className="collections-container">
                {collections.map(collection => <Collection key={collection.id} collection={collection} icon={collection.icon} />)}
            </div>
        </div>
    )
}