import { Skeleton, Box, useMediaQuery, Grid, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product as Container } from "./Product"
import { useColors } from "../../../hooks/useColors"
import { useFranchise } from "../../../hooks/useFranchise"
import kids_image from "../../../images/featured/kids.svg"
import { useNavigate } from "react-router-dom"
//import "./style.scss"

interface PopularProps {}

export const Popular: React.FC<PopularProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const colors = useColors()
    const navigate = useNavigate()
    const { franchise } = useFranchise()

    const [popular, setPopular] = useState<Product[]>([])

    useEffect(() => {
        console.log({ popular })
    }, [popular])

    useEffect(() => {
        if (franchise) {
            api.products.list((response: { data: Product[] }) => setPopular(response.data.sort((a, b) => b.sold - a.sold).slice(0, 6)))
        }
    }, [franchise])

    return (
        <Box
            className="Popular-Component"
            sx={{
                width: " 100%",
                flexDirection: isMobile ? "column" : "row",
                color: colors.primary,
                gap: isMobile ? "1vw" : "0",
            }}
        >
            {isMobile && (
                <>
                    <h3 style={{ fontSize: "5vw" }}>Mais curtidos pela galerinha</h3>
                    <Box
                        className="products-container"
                        sx={{ width: "100vw", marginLeft: "-5vw", padding: "1vw 5vw", gap: "2vw", overflowX: "auto" }}
                    >
                        {popular.map((product) => (
                            <Container key={product.id} product={product} />
                        ))}

                        {popular.length == 0 && (
                            <>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"40vw"} height={"50vw"} />
                            </>
                        )}
                    </Box>
                </>
            )}
            {!isMobile && (
                <Grid container spacing={2} columns={2}>
                    <Grid item xs={1}>
                        <Box sx={{ height: "100%", alignItems: "center", width: "100%" }}>
                            <h3 style={{ fontSize: "3.2rem" }}>
                                Mais curtidos
                                <br />
                                pela galerinha
                            </h3>
                            <img src={kids_image} style={{ width: "9vw", margin: "auto" }} />
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{ gap: "0.5vw" }}>
                            {popular.slice(0, 3).map((product) => (
                                <Container product={product} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{ gap: "0.5vw" }}>
                            {popular.slice(3, 6).map((product) => (
                                <Container product={product} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box
                            sx={{
                                flexDirection: "column",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                height: "100%",
                            }}
                        >
                            <h3 style={{ fontSize: "3.2rem" }}>Não fique de fora!</h3>
                            <Button
                                sx={{
                                    fontSize: "3.2rem",
                                    textDecoration: "underline",
                                    pt: 0,
                                    pb: 0,
                                    fontFamily: "BowlbyOneSC",
                                    textTransform: "unset",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={() => navigate("/search/name/")}
                            >
                                Veja mais
                            </Button>
                        </Box>
                    </Grid>

                    {popular.length == 0 && (
                        <>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" sx={{ flexShrink: 0 }} variant="rounded" width={"15vw"} height={"15vw"} />
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
        </Box>
    )
}
