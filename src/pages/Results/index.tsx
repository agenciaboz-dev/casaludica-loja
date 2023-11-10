import { Avatar, Button, Skeleton, Box, Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Background } from "../../components/Background"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { useApi } from "../../hooks/useApi"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../Home/Collections"
import { useColors } from "../../hooks/useColors"
import { ButtonComponent } from "../../components/ButtonComponent"
import { ProductContainer } from "./ProductContainer"
//import "./style.scss"

interface ResultsProps {}

export const Results: React.FC<ResultsProps> = ({}) => {
    const cart = useCart()
    const navigate = useNavigate()
    const type = useParams().type
    const value = useParams().value
    const api = useApi()
    const colors = useColors()

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const skeleton_style = {
        height: "8vw",
        width: "100%",
    }

    const image_skeleton_style = {
        height: "40vw",
        width: "40vw",
        borderRadius: "5vw",
    }

    const getProducts = () => {
        setLoading(true)
        if (value || (type && value)) {
            if (type == "name") {
                api.products.search(
                    { search: value },
                    {
                        callback: (response: { data: Product[] }) => {
                            console.log(response.data)
                            setProducts(response.data)
                        },
                    }
                )
            } else if (type == "collection") {
                const categories = value.split(",").map((item) => Number(item))
                api.products.collection({
                    data: categories,
                    callback: (response: { data: Product[] }) => {
                        setProducts(response.data)
                    },
                })
            } else if (type == "category") {
                api.products.category(value, {
                    callback: (response: { data: Product[] }) => {
                        setProducts(response.data)
                    },
                })
            }
        } else {
            api.products.list((response: { data: Product[] }) => {
                console.log(response.data)
                setProducts(response.data)
            })
        }
    }

    useEffect(() => {
        console.log(value)
        getProducts()
    }, [type, value])

    useEffect(() => {
        if (products) setLoading(false)
    }, [products])

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Box className="Results-Page" sx={{ width: "100%", flexDirection: "column", gap: "5vw", padding: "0 5vw" }}>
            <Background />
            <Header />

            <SearchField />
            <Collections />

            <h3 className="results-title" style={{ color: colors.primary }}>
                Resultados da pesquisa: {!!products.length && `(${products.length})`}
            </h3>

            {loading ? (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            sx={{
                                flexDirection: "row",
                                gap: "5vw",
                                width: "100%",
                                alignItems: "center",
                                paddingBottom: "8vw",
                            }}
                        >
                            <Skeleton animation="wave" variant="rounded" sx={image_skeleton_style} />
                            <Box sx={{ width: "45%", flexDirection: "column", gap: "2vw" }}>
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                                <Skeleton animation="wave" variant="rounded" sx={skeleton_style} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={2}>
                    {products.map((product: Product) => (
                        <Grid item key={product.id} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <ProductContainer key={product.id} product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {!loading && products.length == 0 && (
                <p style={{ alignSelf: "center", marginBottom: "10vw" }}>Nenhum resultado</p>
            )}

            <Footer />
        </Box>
    )
}
