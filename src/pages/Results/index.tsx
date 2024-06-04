import { Skeleton, Box, Grid, useMediaQuery } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { useCart } from "../../hooks/useCart"
import { useColors } from "../../hooks/useColors"
import { ProductContainer } from "./ProductContainer"
import { useArray } from "burgos-array"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { useFranchise } from "../../hooks/useFranchise"
//import "./style.scss"

interface ResultsProps {}

export const Results: React.FC<ResultsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const cart = useCart()
    const navigate = useNavigate()
    const type = useParams().type
    const value = useParams().value
    const api = useApi()
    const colors = useColors()
    const skeletons = useArray().newArray(3)
    const { franchise } = useFranchise()

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

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
                api.products.collection(Number(value), {
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
        if (!franchise) {
            navigate("/")
        }
        getProducts()
    }, [])

    return franchise ? (
        <DefaultWrapper>
            <h3 className="results-title" style={{ color: colors.primary }}>
                Resultados da pesquisa: {!!products.length && `(${products.length})`}
            </h3>

            {loading ? (
                <Grid container spacing={2} sx={{ marginBottom: "10vw" }} columns={isMobile ? 1 : 3}>
                    {skeletons.map((index) => (
                        <Grid item key={index} xs={1}>
                            <Skeleton key={index} animation="wave" variant="rounded" sx={{ width: "100%", height: isMobile ? "45vw" : "15vw" }} />
                        </Grid>
                    ))}
                    {skeletons.map((index) => (
                        <Grid item key={index} xs={1}>
                            <Skeleton key={index} animation="wave" variant="rounded" sx={{ width: "100%", height: isMobile ? "45vw" : "15vw" }} />
                        </Grid>
                    ))}
                    {skeletons.map((index) => (
                        <Grid item key={index} xs={1}>
                            <Skeleton key={index} animation="wave" variant="rounded" sx={{ width: "100%", height: isMobile ? "45vw" : "15vw" }} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={2} sx={{ marginBottom: "10vw" }} columns={isMobile ? 1 : 3}>
                    {products.map((product: Product) => (
                        <Grid item key={product.id} xs={1}>
                            <ProductContainer key={product.id} product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {!loading && products.length == 0 && <p style={{ alignSelf: "center", marginBottom: "10vw" }}>Nenhum resultado</p>}
        </DefaultWrapper>
    ) : null
}
