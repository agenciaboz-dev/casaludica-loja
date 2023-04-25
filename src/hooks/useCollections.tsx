import { Collection } from '../definitions/products'
import { ReactComponent as ToysIcon } from '../images/colections/toys.svg'
import { ReactComponent as FurnitureIcon } from '../images/colections/furniture.svg'
import { ReactComponent as PlaygroundsIcon } from '../images/colections/playgrounds.svg'
import { ReactComponent as ClothesIcon } from '../images/colections/clothes.svg'
import { ReactComponent as ExclusiveIcon } from '../images/colections/exclusive.svg'
import React from 'react';

export const useCollections = () => {
    const iconStyle = {
        width: '10vw'
    }
    const width = '10vw'
    const collections:Collection[] = [
        {
            id: 1,
            name: 'Brinquedos',
            categories: [1, 2],
            icon: () => <ToysIcon width={width} />
        },
        {
            id: 2,
            name: 'Móveis',
            categories: [],
            icon: () => <FurnitureIcon width={width}/>
        },
        {
            id: 3,
            name: 'Playgrounds',
            categories: [],
            icon: () => <PlaygroundsIcon width={width}/>
        },
        {
            id: 4,
            name: 'Vestuário',
            categories: [],
            icon: () => <ClothesIcon width={width}/>
        },
        {
            id: 5,
            name: 'Exclusivos',
            categories: [],
            icon: () => <ExclusiveIcon width={width}/>
        },
    ]

    return collections
}