import React, { useEffect, useState } from "react"
import { Box, Rating } from "@mui/material"
import { Product } from "boz.pay.component"

interface ProductContainerOnModalProps {
    product: Product
    onRatingChange: (id: number, value: number) => void
    confirmed: boolean
    rating?: boolean
}

export const ProductContainerOnModal: React.FC<ProductContainerOnModalProps> = ({ product, onRatingChange, confirmed }) => {
    const [rating, setRating] = useState(0)

    useEffect(() => {
        onRatingChange(Number(product.referenceId), rating)
    }, [rating])

    return (
        <Box sx={{ display: "contents" }}>
            <Box
                sx={{
                    color: "gray",
                    gap: "2vw",
                    alignItems: "center",
                    width: 1,
                    justifyContent: "space-between",
                    marginTop: "2vw",
                }}
            >
                <Box sx={{ flexDirection: "row", gap: "2vw", alignItems: "center", width: 1 }}>
                    {/* <Avatar src={product.cover} variant="circular" sx={{ width: "8vw", height: "8vw" }} /> */}
                    <p
                        style={{
                            width: "85%", // Define a largura para 100% ou um valor específico em pixels
                            textOverflow: "ellipsis",
                            overflow: "hidden", // Garante que o conteúdo que excede a largura seja escondido
                            whiteSpace: "nowrap",
                            fontSize: "0.9rem",

                        }}
                    >
                        {product.name}
                    </p>

                    {confirmed ? (
                        <Rating
                            value={rating}
                            onChange={(_, value) => setRating(value || 0)}
                            sx={{
                                fontSize: "1.3rem",
                                "& .MuiRating-iconFilled": {
                                    color: "primary.main",
                                },
                                "& .MuiRating-iconHover": {
                                    color: "primary.main",
                                },
                            }}
                        />
                    ) : (
                        <p>{product.quantity} x</p>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
