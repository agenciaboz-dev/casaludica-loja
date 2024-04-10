import React from "react"
import { Avatar, Box, Button, Paper, Skeleton, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { useDynamicImage } from "../../hooks/useDynamicImage"
import { CurrencyText } from "../../components/CurrencyText"

interface SimilarProductProps {
    product: Product
}

export const SimilarProduct: React.FC<SimilarProductProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const cart = useCart()

    const productRef = useDynamicImage(product)

    // const skeleton_style = {
    //     height: isMobile ? "8vw" : "2vw",
    //     width: "100%",
    // }

    // const image_skeleton_style = {
    //     height: isMobile ? "40vw" : "15vw",
    //     width: isMobile ? "40vw" : "15vw",
    //     borderRadius: isMobile ? "5vw" : "1vw",
    // }

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

    //     .skeletons-container {
    //         flex-direction: column;
    //         gap: 3vw;
    //         align-items: center;
    //     }
    //     .results-container {
    //         margin-bottom: 10vw;
    //     }
    // }

    return (
        <Paper
            // className="results-container"
            // style={{
            //     flexDirection: "row",
            //     alignItems: "center",
            //     justifyContent: "space-around",
            // }}

            elevation={2}
            sx={{
                width: "100%",
                gap: isMobile ? "3vw" : "1.5vw",
                borderRadius: isMobile ? "5vw" : "2vw",
                padding: isMobile ? "4vw" : "1vw",
                border: "1px solid red",
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
                        sx={{ width: isMobile ? "35vw" : "15vw", height: isMobile ? "35vw" : "15vw", borderRadius: isMobile ? "5vw" : "0" }}
                    />
                    <Box sx={{ flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw" }}>
                            <Box
                                sx={{
                                    color: "primary.main",
                                    textAlign: "start",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: isMobile ? "32vw" : "100%",
                                    fontFamily: "BowlbyOneSC",
                                    fontSize: isMobile ? "0.7rem" : "",
                                }}
                            >
                                {product.name}
                            </Box>
                            <Box
                                sx={{
                                    color: "#000",
                                    fontSize: isMobile ? "0.7rem" : "",
                                    textAlign: "start",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                    width: isMobile ? "32vw" : "100%",
                                    maxHeight: "13vw",
                                    textTransform: "lowercase",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3, // Defina o número máximo de linhas que deseja exibir
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
                <Box>
                    {/* sx={{ gap: isMobile ? "3vw" : "2vw", width: "90vw", alignItems: "center" }} */}
                    <Skeleton animation="wave" variant="rounded" />
                    {/* sx={image_skeleton_style} */}

                    <Box sx={{ width: isMobile ? "45%" : "100%", flexDirection: "column", gap: "2vw" }}>
                        <Skeleton animation="wave" variant="rounded" />
                        <Skeleton animation="wave" variant="rounded" />
                        <Skeleton animation="wave" variant="rounded" />
                        <Skeleton animation="wave" variant="rounded" />
                        {/* sx={skeleton_style} */}
                    </Box>
                </Box>
            )}
        </Paper>
    )
}
