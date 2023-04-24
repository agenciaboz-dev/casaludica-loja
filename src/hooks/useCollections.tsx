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
            id: 0,
            name: 'Brinquedos',
            icon: () => <ToysIcon width={width} />
        },
        {
            id: 1,
            name: 'Móveis',
            icon: () => <FurnitureIcon width={width}/>
        },
        {
            id: 2,
            name: 'Playgrounds',
            icon: () => <PlaygroundsIcon width={width}/>
        },
        {
            id: 3,
            name: 'Vestuário',
            icon: () => <ClothesIcon width={width}/>
        },
        {
            id: 4,
            name: 'Exclusivos',
            icon: () => <ExclusiveIcon width={width}/>
        },
    ]

    return collections
}