import React from "react"
import { Avatar, Box, Skeleton, Paper, Grid, Button, useMediaQuery, colors } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { useDynamicImage } from "../../hooks/useDynamicImage"
import { CurrencyText } from "../../components/CurrencyText"
import useMeasure from "react-use-measure"

interface ProductContainerProps {
    product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const cart = useCart()
    const [ref, dimensions] = useMeasure()
    const productRef = useDynamicImage(product)

    const skeleton_style = {
        height: isMobile ? "8vw" : "1vw",
        width: isMobile ? "100%" : "100%",
    }

    const image_skeleton_style = {
        height: isMobile ? "40vw" : "12vw",
        width: isMobile ? "40vw" : "23vw",
        borderRadius: isMobile ? "5vw" : "1vw",
    }

    const button_Style = {
        borderRadius: isMobile ? "20vw" : "2vw",
        border: "none",
        color: "white",

        justifyContent: "center",
        alignItems: "center",
        fontFamily: "BowlbyOneSC",
    }

    return (
        <Box
            className="results-container"
            style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                gap: isMobile ? "3vw" : "",
                justifyContent: "space-around",
                borderRadius: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "4vw" : "1vw",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
            }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{ marginBottom: "1vw" }}
            ref={productRef}
        >
            {product.cover ? (
                <>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{ width: isMobile ? "40vw" : "50%", height: "auto", borderRadius: isMobile ? "5vw" : "1vw" }}
                    />
                    <Box ref={ref} sx={{ flexDirection: "column", alignItems: "center", gap: "2vw" }}>
                        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw" }}>
                            <Box sx={{ color: "primary.main" }}>
                                <h4
                                    style={{
                                        textAlign: "start",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        width: isMobile ? "40vw" : dimensions.width * 1,
                                    }}
                                >
                                    {product.name}
                                </h4>
                            </Box>
                            <h2
                                style={{
                                    textAlign: "start",
                                    fontSize: isMobile ? "5vw" : "1.5rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: isMobile ? "40vw" : "100%",
                                    color: "#363775",
                                }}
                            >
                                <CurrencyText value={product.price} style={{ fontWeight: "bold" }} />
                            </h2>
                        </Box>
                        <Button
                            onClick={() => cart.add(product)}
                            color="success"
                            variant="contained"
                            fullWidth
                            sx={{ ...button_Style }}
                            disabled={product.stock == 0}
                        >
                            {product.stock == 0 ? "Indisponível" : "Quero esse"}
                        </Button>
                    </Box>
                </>
            ) : (
                <Box
                    sx={{
                        gap: isMobile ? "3vw" : "1vw",
                        width: "90vw",
                        alignItems: "center",
                        height: isMobile ? "" : "12vw",
                    }}
                >
                    <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />

                    <Box sx={{ width: isMobile ? "45%" : "100%", flexDirection: "column", gap: isMobile ? "5vw" : "2vw" }}>
                        <Skeleton animation="wave" variant="rounded" sx={{ ...skeleton_style, height: isMobile ? "5vw" : "1.5vw" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ ...skeleton_style, height: isMobile ? "7vw" : "2.2vw" }} />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ ...skeleton_style, height: isMobile ? "9vw" : "2.4vw", borderRadius: "5vw" }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
