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
        <Box sx={{ position: "relative", justifyContent: "center", alignItems: "center", gap: "3vw" }}>
            <img src={"data:image/jpeg;base64," + product.cover} alt="product" style={{ width: "37vw", height: "37vw" }} />
            <Box sx={{ color: "#363775", fontWeight: "500", fontSize: "3vw", flexDirection: "column" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <p style={{ fontSize: "3.1vw" }}>
                        Produto: <span style={{ fontWeight: "bold" }}>{product.name}</span>
                    </p>
                    <Box sx={{ flexDirection: "row", gap: "1vw", alignItems: "center" }}>
                        <p style={{ fontSize: "3.1vw" }}>Quantidade: </p>
                        <input
                            type="number"
                            className="number"
                            value={productQuantity}
                            onChange={(event) => setProductQuantity(Number(event.target.value))}
                            style={{ width: "30%", borderRadius: "1.6vw", height: "5.5vw", padding: "2vw" }}
                        />
                    </Box>
                </Box>
                <p style={{ fontSize: "3.5vw" }}>
                    Preço:{" "}
                    <span style={{ color: "#686868", fontWeight: "bolder", fontSize: "3.8vw" }}>
                        R${product.price * productQuantity}
                    </span>
                </p>
            </Box>
            <IconButton
                className="close"
                onClick={deleteProduct}
                sx={{ position: "absolute", top: "0vw", right: "0vw", padding: 0 }}
            >
                {/* <CloseIcon style={{ height: "auto", width: "6vw" }} /> */}x
            </IconButton>
        </Box>
    )
}
