import { Avatar, IconButton, Box, Skeleton } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CurrencyText } from "../../../../components/CurrencyText"
import { useCart } from "../../../../hooks/useCart"
import { useColors } from "../../../../hooks/useColors"
import { ReactComponent as CartIcon } from "../../../../images/cart.svg"
import { useApi } from "../../../../hooks/useApi"
import { useProducts } from "../../../../hooks/useProducts"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const cart = useCart()
    const colors = useColors()
    const navigate = useNavigate()
    const api = useApi()

    const { add: updateProduct } = useProducts()

    const productRef = useRef(null)

    const handleProductVisible = () => {
        api.images(product.id, true).then((image) => {
            updateProduct({ ...product, cover: image })
            product.cover = image
        })
    }

    useEffect(() => {
        if (!product.cover) {
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
        }
    }, [product, productRef])

    return (
        <Box
            ref={productRef}
            className="Product-Component"
            style={{ backgroundImage: `url(data:image/jpeg;base64,${product.cover})` }}
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
                borderRadius: "1vw",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
                flexShrink: "0",
                width: "40vw",
                height: "50vw",
                backgroundColor: "white",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // background-position: center,
                padding: "2vw",
            }}
        >
            {/* <Avatar src={product.cover} sx={{width: '30vw', height: '30vw'}} /> */}
            {product.cover ? (
                <Box
                    className="container"
                    sx={{
                        justifyContent: "space-between",
                        marginTop: "auto",
                        backgroundColor: "white",
                        padding: "3vw",
                        borderRadius: "2vw",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.4)",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Box className="text" sx={{ flexDirection: "column", fontSize: "3.5vw", fontWeight: "bold", gap: "2vw" }}>
                        <p className="name" style={{ whiteSpace: "nowrap", width: "20vw", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {product.name}
                        </p>
                        <CurrencyText value={product.price} color={colors.pink} />
                    </Box>
                    <IconButton sx={{ backgroundColor: colors.primary, width: "9vw", height: "9vw" }} onClick={() => cart.add(product)}>
                        <CartIcon />
                    </IconButton>
                </Box>
            ) : (
                <Skeleton sx={{ flexShrink: 0 }} variant="rounded" width={"35vw"} height={"45vw"} animation="wave" />
            )}
        </Box>
    )
}
