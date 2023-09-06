import React, { useEffect, useState } from "react"
import { useApi } from "../../../hooks/useApi"
import { Product } from "./Product"
import { Skeleton } from "@mui/material"
import "./style.scss"
import { ReactComponent as BackgroundImage } from "../../../images/background/featured.svg"

interface FeaturedCategoryProps {}

export const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({}) => {
    const [title, setTitle] = useState("Para reunir a família")
    const [categories, setCategories] = useState([1, 2, 3, 4])
    const [products, setProducts] = useState<Product[]>([])

    const api = useApi()

    useEffect(() => {
        api.products.collection({
            data: categories,
            callback: (response: { data: Product[] }) => {
                setProducts(response.data)
            },
        })
    }, [])

    return (
        <div className="FeaturedCategory-Component">
            <BackgroundImage className="background" />
            <h3>{title}</h3>
            <div className="product-list">
                {products.slice(0, 4).map((product) => (
                    <Product key={product.id} product={product} />
                ))}
                {products.length == 0 && (
                    <>
                        <Skeleton variant="rounded" className="skeleton" />
                        <Skeleton variant="rounded" className="skeleton" />
                        <Skeleton variant="rounded" className="skeleton" />
                        <Skeleton variant="rounded" className="skeleton" />
                    </>
                )}
            </div>
        </div>
    )
}
