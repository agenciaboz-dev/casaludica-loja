import React from "react"
import { Box, Button } from "@mui/material"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useCategories } from "../../hooks/useCategories"
import { useNavigate } from "react-router-dom"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const { categories } = useCategories()
    const navigate = useNavigate()

    return (
        <DefaultWrapper>
            <Box sx={{ flexDirection: "column", gap: "2vw", paddingBottom: "5vw" }}>
                {categories.map((category) => (
                    <Button key={category.id} variant="contained" onClick={() => navigate(`/search/category/${category.id}`)}>
                        {category.name}
                    </Button>
                ))}
            </Box>
        </DefaultWrapper>
    )
}
