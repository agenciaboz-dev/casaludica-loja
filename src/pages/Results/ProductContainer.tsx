import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../components/ButtonComponent"
import { useCart } from "../../hooks/useCart"
import { useApi } from "../../hooks/useApi"

interface ProductContainerProps {
    product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    const navigate = useNavigate()
    const cart = useCart()
    const api = useApi()

    const productRef = useRef(null)

    const [image, setImage] = useState("")

    const handleProductVisible = () => {
        api.images(product.id, true).then((images) => {
            setImage(images)
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
            <h1>{product.name}</h1>
            <Avatar src={"data:image/jpeg;base64," + image} sx={{ width: "50vw", height: "auto" }} />
            <h3>{product.resume}</h3>
            <p>{product.description}</p>
            <ButtonComponent onClick={() => cart.add(product)}>Quero esse</ButtonComponent>
        </Box>
    )
}
