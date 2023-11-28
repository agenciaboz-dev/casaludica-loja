import React from "react"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useCategories } from "../../hooks/useCategories"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface CollectionsProps {}

export const Collections: React.FC<CollectionsProps> = ({}) => {
    const { collections } = useCategories()

    const navigate = useNavigate()

    return (
        <DefaultWrapper>
            <Box sx={{ flexDirection: "column", gap: "2vw", paddingBottom: "5vw" }}>
                {collections.map((collection) => (
                    <Button key={collection.id} variant="contained" onClick={() => navigate(`/search/collection/${collection.id}`)}>
                        {collection.name}
                    </Button>
                ))}
            </Box>
        </DefaultWrapper>
    )
}
