import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
//import './style.scss';
import { Avatar, Box, Skeleton, alpha } from "@mui/material"
import BrokenImageIcon from "@mui/icons-material/BrokenImage"
import { useNavigate } from "react-router-dom"
import { useColors } from "../../../hooks/useColors"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const { categories } = useCategories()
    const navigate = useNavigate()
    const colors = useColors()

    const search = (category: Category) => {
        navigate(`/search/category/${category.id}`)
    }

    return (
        <Box className="Categories-Component" sx={{ width: "100%", flexDirection: "column", color: colors.primary, gap: "1vw" }}>
            <h3 style={{ fontSize: "5vw" }}>Categorias</h3>
            <Box
                className="categories-container"
                sx={{
                    gap: "3vw",
                    width: "100vw",
                    marginLeft: "-5vw",
                    overflowX: "auto",
                    padding: "1vw 5vw",
                }}
            >
                {categories.map((category) => (
                    <Box
                        className="category-container"
                        key={category.id}
                        onClick={() => search(category)}
                        sx={{
                            boxShadow: `0 2px 3px rgba(0, 0, 0, 0.4)`,
                            borderRadius: "2vw",
                            width: "fit-content",
                            padding: "5vw 2vw",
                            alignItems: "center",
                            gap: "3vw",
                            flexShrink: "0",
                            overflowX: "hidden",
                        }}
                    >
                        <Avatar src={`/${category.id}`} variant={"rounded"} sx={{ bgcolor: colors.primary, borderRadius: "5vw" }}>
                            <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
                        </Avatar>
                        <p style={{ fontSize: "4vw", wordBreak: "break-all" }}>{category.name}</p>
                    </Box>
                ))}
                {categories.length == 0 && (
                    <>
                        <Skeleton animation="wave" variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                        <Skeleton animation="wave" variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                        <Skeleton animation="wave" variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                    </>
                )}
            </Box>
        </Box>
    )
}