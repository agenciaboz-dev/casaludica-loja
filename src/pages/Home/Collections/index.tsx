import React from 'react';
import { useNavigate } from "react-router-dom"
import { useCollections } from "../../../hooks/useCollections"
import { Box, MenuItem } from "@mui/material"
import { useColors } from "../../../hooks/useColors"
import ToysIcon from "@mui/icons-material/Toys"

interface CollectionProps {
    collection: Collection
}

export const Collections = ({}) => {
    const colors = useColors()

    const Collection: React.FC<CollectionProps> = ({ collection }) => {
        return (
            <MenuItem style={{ flexDirection: "column", alignItems: "center" }} onClick={() => handleClick(collection)}>
                <ToysIcon sx={{ width: "10vw" }} />
                <p>{collection.name}</p>
            </MenuItem>
        )
    }

    const handleClick = (collection: Collection) => {
        navigate(`/search/collection/${collection.id}`)
    }

    const collections = useCollections()
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
                    boxShadow: " 0 1vw 2vw 0 rgba(0,0,0,0.4)",
                    overflowX: "auto",
                    textAlign: "center",
                }}
            >
                {collections.map((collection) => (
                    <Collection key={collection.id} collection={collection} />
                ))}
            </Box>
        </Box>
    )
}