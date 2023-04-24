import React from 'react';
import { Collection } from '../../../definitions/products';
import { useCollections } from '../../../hooks/useCollections';

interface CollectionProps {
    collection: Collection
    icon: any
}

export const Collections = ({  }) => {

    const Collection:React.FC<CollectionProps> = ({ collection, icon: IconComponent }) => {
        return (
            <div style={{ flexDirection: 'column', alignItems: 'center' }}>
                <IconComponent />
                <p>{collection.name}</p>
            </div>
        )
    }

    const collections = useCollections()
    
    return (
        <div className='Collections-Component' >
            <h3>Coleções</h3>
            <div className="collections-container">
                {collections.map(collection => <Collection key={collection.id} collection={collection} icon={collection.icon} />)}
            </div>
        </div>
    )
}