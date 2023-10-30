import { IconButton, Box } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
// import { ReactComponent as CloseIcon } from "../../images/x.svg"

interface ProductProps {
    product: Product
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const cart = useCart()
    const navigate = useNavigate()

    const [productQuantity, setProductQuantity] = useState(product.quantity)

    const deleteProduct = () => {
        if (cart.products.length > 1) {
            cart.remove(product)
        } else {
            cart.remove(product)
            navigate("/")
        }
    }
    return (
        <Box className="product-container" sx={{ position: "relative", justifyContent: "center", alignItems: "center", gap: "3vw" }}>
            <img src={"data:image/jpeg;base64," + product.cover} alt="product" className="img-product" style={{ width: "37vw", height: "37vw" }} />
            <Box className="right-container" sx={{ color: "#363775", fontWeight: "500", fontSize: "3vw", flexDirection: "column" }}>
                <p className="name-product">
                    Produto: <span style={{ fontWeight: "bold" }}>{product.name}</span>
                </p>
                <p className="quantity">
                    Quantidade:{" "}
                    <input
                        type="number"
                        className="number"
                        value={productQuantity}
                        onChange={(event) => setProductQuantity(Number(event.target.value))}
                        style={{ width: "30%", borderRadius: "1.6vw", height: "5.5vw" }}
                    />
                </p>
                <p className="price-product">
                    Preço:{" "}
                    <span className="price" style={{ color: "#686868", fontWeight: "bolder", fontSize: "3vw" }}>
                        R${product.price}
                    </span>
                </p>
            </Box>
            <IconButton className="close" onClick={deleteProduct} sx={{ position: "absolute", top: "0vw", right: "0vw" }}>
                {/* <CloseIcon style={{ height: "auto", width: "6vw" }} /> */}x
            </IconButton>
        </Box>
    )
}
