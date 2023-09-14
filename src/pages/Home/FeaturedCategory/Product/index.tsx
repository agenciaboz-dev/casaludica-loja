import { Avatar, Button, Box } from "@mui/material"
import React from "react"
import BrokenImageIcon from "@mui/icons-material/BrokenImage"
import { useColors } from "../../../../hooks/useColors"
import { CurrencyText } from "../../../../components/CurrencyText"
import { useCart } from "../../../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../../../components/ButtonComponent"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const colors = useColors()
    const cart = useCart()
    const navigate = useNavigate()

    return (
        <Box
            className="Product-Component"
            onClick={() => navigate(`/product/${product.id}`)}
            sx={{
                borderRadius: "5vw",
                width: "43vw",
                height: "fit-content",
                alignItems: "center",
                gap: "1.5vw",
                color: colors.primary,
                backgroundColor: "white",
                textAlign: "center",
                padding: "2vw",
                flexDirection: "column",
                boxShadow: `0 2px 3px rgba(0, 0, 0, 0.4)`,

                "& .Product-Component:nth-child(2n)": { marginTop: "-17vw" },
            }}
        >
            <Avatar
                src={product.cover}
                variant={"rounded"}
                sx={{ bgcolor: colors.primary, width: "30vw", height: "30vw", borderRadius: "5vw" }}
            >
                <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
            </Avatar>
            <h2 style={{ fontSize: "5vw" }}>{product.name}</h2>
            <p style={{ fontSize: "3.5vw" }}>{product.resume}</p>
            <CurrencyText value={product.price} color={"#686868"} style={{ fontWeight: "bold" }} />

            <ButtonComponent sx={{ fontSize: "4vw", fontWeight: "400" }} onClick={() => cart.add(product)}>
                Quero esse
            </ButtonComponent>
        </Box>
    )
}
