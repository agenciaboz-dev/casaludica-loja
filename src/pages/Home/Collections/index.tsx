import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collection } from "../../../definitions/products"
import { useApi } from '../../../hooks/useApi';
import { useCollections } from '../../../hooks/useCollections';
import { useLoading } from '../../../hooks/useLoading';
import { Box } from "@mui/material"
import { useColors } from "../../../hooks/useColors"
//import './style.scss'

interface CollectionProps {
    collection: Collection
    icon: any
}

export const Collections = ({}) => {
    const colors = useColors()

    const Collection: React.FC<CollectionProps> = ({ collection, icon: IconComponent }) => {
        return (
            <Box style={{ flexDirection: "column", alignItems: "center" }} onClick={() => handleClick(collection)}>
                <IconComponent />
                <p>{collection.name}</p>
            </Box>
        )
    }

    const handleClick = (collection: Collection) => {
        navigate(`/search/collection/${collection.categories}`)
    }

    const { setLoading } = useLoading()
    const collections = useCollections()
    const api = useApi()
    const navigate = useNavigate()

    return (
        <Box className="Collections-Component" sx={{ width: "100%", flexDirection: "column", gap: "1vw", color: "white" }}>
            <h3>Coleções</h3>
            <Box
                className="collections-container"
                sx={{
                    backgroundColor: "white",
                    borderRadius: "3vw",
                    justifyContent: "space-between",
                    fontSize: "2.5vw",
                    fontWeight: "bold",
                    color: colors.primary,
                    padding: "2vw 5vw",
                    boxShadow: " 0 1vw 2vw 0 rgba(0,0,0,0.4)",
                }}
            >
                {collections.map((collection) => (
                    <Collection key={collection.id} collection={collection} icon={collection.icon} />
                ))}
            </Box>
        </Box>
    )
}