import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../components/ButtonComponent"
import { useCart } from "../../hooks/useCart"
import { useApi } from "../../hooks/useApi"
import { sentenceCase } from "change-case"
import { useProducts } from "../../hooks/useProducts"

interface ProductContainerProps {
    product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    const navigate = useNavigate()
    const cart = useCart()
    const api = useApi()
    const { add: updateProduct } = useProducts()

    const productRef = useRef(null)

    const [image, setImage] = useState("")

    const skeleton_style = {
        height: "10vw",
        width: "100%",
    }

    const image_skeleton_style = {
        height: "40vw",
        width: "40vw",
        borderRadius: "5vw",
    }

    const handleProductVisible = () => {
        api.images(product.id, true).then((image) => {
            setImage(image)
            updateProduct({ ...product, cover: image })
            product.cover = image
        })
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                const [entry] = entries
                if (entry.isIntersecting) {
                    // The product is now in the viewport, fetch the image
                    handleProductVisible()
                    observer.unobserve(entry.target) // Stop observing since image is fetched
                }
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0.1, // 10% of the product should be visible
            }
        )

        if (productRef.current) {
            observer.observe(productRef.current)
        }

        return () => {
            if (productRef.current) {
                observer.unobserve(productRef.current)
            }
        }
    }, [product, productRef])

    return (
        <Box
            className="results-container"
            style={{ flexDirection: "column", alignItems: "center" }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{ marginBottom: "10vw" }}
            ref={productRef}
        >
            {image ? (
                <>
                    <h1>{sentenceCase(product.name, { locale: "pt-br" })}</h1>
                    <Avatar src={"data:image/jpeg;base64," + image} variant="square" sx={{ width: "50vw", height: "auto", borderRadius: "5vw" }} />
                    <h3>{product.resume}</h3>
                    <p>{product.description}</p>
                    <ButtonComponent onClick={() => cart.add(product)}>Quero esse</ButtonComponent>
                </>
            ) : (
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "100%", alignItems: "center" }}>
                    <Skeleton variant="rounded" sx={image_skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                    <Skeleton variant="rounded" sx={skeleton_style} />
                </Box>
            )}
        </Box>
    )
}
