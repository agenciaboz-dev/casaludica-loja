import React from "react"
import { Avatar, Box, Button, Paper, Skeleton, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { useDynamicImage } from "../../hooks/useDynamicImage"
import { CurrencyText } from "../../components/CurrencyText"
import ImageIcon from "@mui/icons-material/Image"

interface SimilarProductProps {
    product: Product
}

export const SimilarProduct: React.FC<SimilarProductProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const cart = useCart()

    const productRef = useDynamicImage(product)

    // const button_Style = {
    //     borderRadius: isMobile ? "20vw" : "2vw",
    //     border: "none",
    //     color: "white",

    //     justifyContent: "center",
    //     alignItems: "center",
    //     fontFamily: "BowlbyOneSC",
    // }

    // const resultsPage = {
    //     width: 100%;
    //     flex-direction: column;
    //     gap: 5vw;
    //     padding: 0 5vw;

    //     .results-title {
    //         color: $primary-color;
    //     }

    //     .results-container {
    //         margin-bottom: 10vw;
    //     }
    // }

    // className="results-container"
    // style={{
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-around",
    // }}

    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                gap: isMobile ? "3vw" : "1.5vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "4vw" : "1vw",
                userSelect: "none",
            }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            ref={productRef}
        >
            {product.cover ? (
                <>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant="square"
                        sx={{
                            width: isMobile ? "35vw" : "11vw",
                            height: isMobile ? "35vw" : "11vw",
                            borderRadius: isMobile ? "5vw" : "2vw",
                            pointerEvents: "none",
                        }}
                    >
                        <ImageIcon sx={{ width: "auto", height: "auto" }} />
                    </Avatar>
                    <Box sx={{ flexDirection: "column", alignItems: "center" }}>
                        <Box
                            sx={{
                                fontFamily: "BowlbyOneSC",
                                color: "primary.main",
                                fontSize: isMobile ? "0.7rem" : "1.2rem",
                                textAlign: "start",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                                width: isMobile ? "32vw" : "12vw",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                            }}
                        >
                            {product.name}
                        </Box>
                        <Box sx={{ flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "space-evenly" }}>
                            <Box
                                sx={{
                                    color: "#000",
                                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                                    textAlign: "start",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                    width: isMobile ? "32vw" : "100%",
                                    maxHeight: "13vw",
                                    textTransform: "lowercase",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3,
                                }}
                            >
                                {product.description}
                            </Box>
                            <Box
                                sx={{
                                    textAlign: "start",
                                    fontSize: isMobile ? "0.9rem" : "1.5rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: isMobile ? "32vw" : "100%",
                                }}
                            >
                                <CurrencyText value={product.price} style={{ fontWeight: "bold" }} />
                            </Box>
                        </Box>
                        <Button
                            onClick={() => cart.add(product)}
                            color="success"
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: isMobile ? "20vw" : "2vw",
                                mt: "auto",
                                color: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "BowlbyOneSC",
                                fontSize: "0.7rem",
                            }}
                            disabled={product.stock == 0}
                        >
                            {product.stock == 0 ? "Indisponível" : "Quero esse"}
                        </Button>
                    </Box>
                </>
            ) : (
                <Box sx={{ gap: isMobile ? "3vw" : "2vw", width: isMobile ? "90vw" : "24vw", alignItems: "center" }}>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{
                            height: isMobile ? "35vw" : "11vw",
                            width: isMobile ? "35vw" : "11vw",
                            borderRadius: isMobile ? "5vw" : "1vw",
                        }}
                    />

                    <Box sx={{ width: isMobile ? "45%" : "100%", flexDirection: "column", gap: "2vw" }}>
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "100%" }} />
                    </Box>
                </Box>
            )}
        </Paper>
    )
}
