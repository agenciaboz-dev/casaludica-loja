import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom"
import { CurrencyText } from "../../../../components/CurrencyText"
import { useCart } from "../../../../hooks/useCart"
import { useColors } from "../../../../hooks/useColors"
import { ReactComponent as CartIcon } from "../../../../images/cart.svg"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const cart = useCart()
    const colors = useColors()
    const navigate = useNavigate()

    return (
        <div
            className="Product-Component"
            style={{ backgroundImage: `url("${product.cover}")` }}
            onClick={() => navigate(`/product/${product.id}`)}
        >
            {/* <Avatar src={product.cover} sx={{width: '30vw', height: '30vw'}} /> */}
            <div className="container">
                <div className="text">
                    <p className="name">{product.name}</p>
                    <CurrencyText value={product.price} color={colors.pink} />
                </div>
                <IconButton
                    sx={{ backgroundColor: colors.primary, width: "9vw", height: "9vw" }}
                    onClick={() => cart.add(product)}
                >
                    <CartIcon />
                </IconButton>
            </div>
        </div>
    )
}