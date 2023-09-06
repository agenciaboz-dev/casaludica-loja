import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import './style.scss';
import { Avatar, Skeleton } from '@mui/material'
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
        <div className="Categories-Component">
            <h3>Categorias</h3>
            <div className="categories-container">
                {categories.map((category) => (
                    <div className="category-container" key={category.id} onClick={() => search(category)}>
                        <Avatar
                            src={`/${category.id}`}
                            variant={"rounded"}
                            sx={{ bgcolor: colors.primary, borderRadius: "5vw" }}
                        >
                            <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
                        </Avatar>
                        <p>{category.name}</p>
                    </div>
                ))}
                {categories.length == 0 && (
                    <>
                        <Skeleton variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                        <Skeleton variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                        <Skeleton variant="rounded" width={"40vw"} height={"20vw"} sx={{ flexShrink: 0 }} />
                    </>
                )}
            </div>
        </div>
    )
}