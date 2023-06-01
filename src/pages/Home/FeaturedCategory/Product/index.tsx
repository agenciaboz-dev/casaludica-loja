import { Avatar, Button } from '@mui/material';
import React from 'react';
import { Product as ProductType } from '../../../../definitions/products';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { useColors } from '../../../../hooks/useColors';
import { CurrencyText } from '../../../../components/CurrencyText';
import { useCart } from '../../../../hooks/useCart';
import { useNavigate } from "react-router-dom"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const colors = useColors()
    const cart = useCart()
    const navigate = useNavigate()

    return (
        <div className="Product-Component" onClick={() => navigate(`/product/${product.id}`)}>
            <Avatar
                src={product.cover}
                variant={"rounded"}
                sx={{ bgcolor: colors.primary, width: "30vw", height: "30vw", borderRadius: "5vw" }}
            >
                <BrokenImageIcon sx={{ width: "auto", height: "auto" }} />
            </Avatar>
            <h2>{product.name}</h2>
            <p>{product.resume}</p>
            <CurrencyText value={product.price} color={"#686868"} style={{ fontWeight: "bold" }} />
            <Button
                onClick={() => cart.add(product)}
                variant="contained"
                fullWidth
                sx={{ backgroundColor: colors.green, borderRadius: "10vw", fontFamily: "BowlbyOneSC", fontWeight: "400", fontSize: "4vw", padding: 0 }}
            >
                Quero esse
            </Button>
        </div>
    )
}