import { Skeleton, Box, useMediaQuery, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product as Container } from "./Product"
import { useColors } from "../../../hooks/useColors"
import { useFranchise } from "../../../hooks/useFranchise"
//import "./style.scss"

interface PopularProps {}

export const Popular: React.FC<PopularProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const api = useApi()
    const colors = useColors()
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
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <h3 style={{ fontSize: "2.5rem", marginRight: "auto" }}>
                        Mais curtidos
                        <br />
                        pela galerinha
                    </h3>
                    {popular.map((product) => (
                        <Grid item key={product.id}>
                            <Container product={product} />
                        </Grid>
                    ))}
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
                    <Box
                        sx={{
                            flexDirection: "column",
                            marginLeft: "auto",
                        }}
                    >
                        <h3 style={{ fontSize: "2.5rem" }}>Não fique de fora!</h3>
                        <h3 style={{ fontSize: "2.5rem", textDecoration: "underline" }}>Veja mais</h3>
                    </Box>
                </Grid>
            )}
        </Box>
    )
}
