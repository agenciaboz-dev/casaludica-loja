import { Avatar, Button, Box, Skeleton, useMediaQuery } from "@mui/material"
import React, { useEffect, useRef } from "react"
import BrokenImageIcon from "@mui/icons-material/BrokenImage"
import { useColors } from "../../../../hooks/useColors"
import { CurrencyText } from "../../../../components/CurrencyText"
import { useCart } from "../../../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../../../components/ButtonComponent"
import { useDynamicImage } from "../../../../hooks/useDynamicImage"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const cart = useCart()
    const navigate = useNavigate()

    const productRef = useDynamicImage(product)

    return (
        <Box
            ref={productRef}
            className="Product-Component"
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
                borderRadius: isMobile ? "5vw" : "1.5vw",
                flex: 1,
                height: "fit-content",
                minHeight: isMobile ? "75vw" : "25vw",
                maxWidth: "43vw",
                alignItems: "center",
                justifyContent: "space-between",
                color: colors.primary,
                backgroundColor: "white",
                textAlign: "center",
                padding: isMobile ? "2vw" : "1vw",
                flexDirection: "column",
                boxShadow: `0 2px 3px rgba(0, 0, 0, 0.4)`,

                "& .Product-Component:nth-child(2n)": { marginTop: "-17vw" },
            }}
        >
            {product.cover ? (
                <>
                    <Avatar
                        src={"data:image/jpeg;base64," + product.cover}
                        variant={"rounded"}
                        sx={{
                            bgcolor: colors.primary,
                            width: isMobile ? "30vw" : "10vw",
                            height: isMobile ? "30vw" : "10vw",
                            borderRadius: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
                    </Avatar>
                    <h2 style={{ fontSize: isMobile ? "5vw" : "1.2rem" }}>{product.name}</h2>
                    <p style={{ fontSize: isMobile ? "3.5vw" : "1rem" }}>{product.resume}</p>
                    <CurrencyText value={product.price} color={"#686868"} style={{ fontWeight: "bold" }} />

                    <ButtonComponent sx={{ fontWeight: "400" }} onClick={() => cart.add(product)}>
                        Quero esse
                    </ButtonComponent>
                </>
            ) : (
                <Skeleton
                    animation="wave"
                    variant="rounded"
                    className="skeleton"
                    sx={{
                        width: isMobile ? "43vw" : "15vw",
                        height: isMobile ? "75vw" : "23vw",

                        ".skeleton:nth-child(2n)": {
                            marginTop: "-10vw",
                        },
                    }}
                />
            )}
        </Box>
    )
}
