import { Avatar, Button, Skeleton } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Background } from "../../components/Background"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { SearchField } from "../../components/SearchField"
import { Product } from "../../definitions/products"
import { useApi } from "../../hooks/useApi"
import { useCart } from "../../hooks/useCart"
import { Collections } from "../Home/Collections"
import "./style.scss"

interface ResultsProps {}

export const Results: React.FC<ResultsProps> = ({}) => {
    const cart = useCart()
    const navigate = useNavigate()
    const type = useParams().type
    const value = useParams().value
    const api = useApi()

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const skeleton_style = {
        height: "10vw",
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
            } else if (type == 'category') {
                api.products.category(value, {
                    callback: (response: { data: Product[] }) => {
                        setProducts(response.data)
                    }
                })
            }
        } else {
            api.products.get((response: { data: Product[] }) => {
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
        <div className="Results-Page">
            <Background />
            <Header />

            <SearchField />
            <Collections />

            <h3 className="results-title">Resultados da pesquisa:</h3>

            {loading ? (
                <div className="skeletons-container">
                    <Skeleton variant="rounded" sx={image_skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={image_skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={image_skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                </div>
            ) : (
                products.map((product: Product) => (
                    <div
                        className="results-container"
                        style={{ flexDirection: "column", alignItems: "center" }}
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <h1>{product.name}</h1>
                        <Avatar src={product.cover} sx={{ width: "50vw", height: "auto" }} />
                        <h3>{product.resume}</h3>
                        <p>{product.description}</p>
                        <Button variant="contained" onClick={() => cart.add(product)}>
                            Eu quero
                        </Button>
                    </div>
                ))
            )}

            {!loading && products.length == 0 && <p style={{ alignSelf: "center", marginBottom: "10vw" }}>Nenhum resultado</p>}

            <Footer />
        </div>
    )
}
