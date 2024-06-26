import React, { useRef } from "react"
import { useCategories } from "../../../hooks/useCategories"
//import './style.scss';
import { Avatar, Box, MenuItem, Skeleton, alpha, useMediaQuery } from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"
import { useNavigate } from "react-router-dom"
import { useColors } from "../../../hooks/useColors"
import { sentenceCase } from "change-case"
import CategoryIcon from "@mui/icons-material/Category"
import { useDraggable } from "react-use-draggable-scroll"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { categories } = useCategories()
    const navigate = useNavigate()
    const colors = useColors()
    const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(ref, { applyRubberBandEffect: true })

    const search = (category: Category) => {
        navigate(`/search/category/${category.id}`)
    }

    return (
        <Box className="Categories-Component" sx={{ width: "100%", flexDirection: "column", color: colors.primary, gap: isMobile ? "1vw" : 0 }}>
            <h3 style={{ fontSize: isMobile ? "5vw" : "1.5rem" }}>Categorias</h3>
            <Box
                ref={ref}
                {...events}
                className="categories-container"
                sx={{
                    gap: isMobile ? "3vw" : "1vw",
                    width: "100vw",
                    marginLeft: isMobile ? "-5vw" : "-10vw",
                    overflowX: "auto",
                    padding: isMobile ? "1vw 5vw" : "0.5vw 10vw",
                    scrollbarWidth: "none",
                }}
            >
                {categories.map((category) => (
                    <MenuItem
                        className="category-container"
                        key={category.id}
                        onClick={() => search(category)}
                        sx={{
                            boxShadow: `0 2px 3px rgba(0, 0, 0, 0.4)`,
                            borderRadius: isMobile ? "2vw" : "0.5vw",
                            width: "fit-content",
                            padding: isMobile ? "5vw 2vw" : "1vw",
                            alignItems: "center",
                            gap: isMobile ? "3vw" : "1vw",
                            flexShrink: "0",
                            overflowX: "hidden",
                        }}
                    >
                        {/* <Avatar src={`/${category.id}`} variant={"rounded"} sx={{ bgcolor: colors.primary, borderRadius: "5vw" }}>
                            <ImageIcon sx={{ width: "auto", height: "auto" }} />
                        </Avatar> */}
                        <CategoryIcon />
                        <p style={{ fontSize: isMobile ? "4vw" : "1rem", wordBreak: "break-all" }}>{sentenceCase(category.name)}</p>
                    </MenuItem>
                ))}
                {categories.length == 0 && (
                    <>
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={isMobile ? "40vw" : "10vw"}
                            height={isMobile ? "20vw" : "4vw"}
                            sx={{ flexShrink: 0 }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={isMobile ? "40vw" : "10vw"}
                            height={isMobile ? "20vw" : "4vw"}
                            sx={{ flexShrink: 0 }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={isMobile ? "40vw" : "10vw"}
                            height={isMobile ? "20vw" : "4vw"}
                            sx={{ flexShrink: 0 }}
                        />
                    </>
                )}
            </Box>
        </Box>
    )
}
