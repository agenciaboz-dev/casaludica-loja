import { Drawer, Box } from '@mui/material';
import React from 'react';
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { useCart } from '../../hooks/useCart';
import { CurrencyText } from '../CurrencyText';
import { Product } from './Product';
import { useColors } from "../../hooks/useColors";
// import './style.scss';
import { ButtonComponent } from "../ButtonComponent"
import { useNavigate } from "react-router-dom"

interface CartProps {
    isOpen: boolean
    setOpen: (value: boolean) => void
}

export const Cart: React.FC<CartProps> = ({ isOpen, setOpen }) => {
    const colors = useColors()
    const cart = useCart()
    const navigate = useNavigate()

    const closeMenu = () => {
        setOpen(false)
    }

    const finishOrder = () => {
        navigate("/checkout")
        closeMenu()
    }
    return (
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={closeMenu}
            PaperProps={{ className: "Cart-Component", style: { width: "80vw" } }}
        >
            <Box
                className="info"
                style={{
                    backgroundColor: colors.primary,
                    padding: "10vw",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <CartIcon />
                <Box
                    className="text"
                    style={{
                        flexDirection: "column",
                        color: "white",
                    }}
                >
                    <h3 style={{ fontSize: "4vw" }}>SEU CARRINHO</h3>
                    <p className="total" style={{ fontSize: "3vw" }}>
                        Valor total: {<CurrencyText value={cart.total} />}
                    </p>
                </Box>
                <Box
                    className="amount-circle"
                    style={{
                        borderRadius: "100%",
                        backgroundColor: colors.secondary,
                        width: "10vw",
                        height: "10vw",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h3>{cart.products?.length || 0}</h3>
                </Box>
            </Box>
            <Box
                className="product-list"
                style={{
                    flexDirection: "column",
                    gap: "5vw",
                    overflowY: "auto",
                    height: "80vh",
                    padding: "5vw",
                }}
            >
                {cart.products?.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Box>
            <Box
                className="button-container"
                style={{
                    width: "100%",
                    padding: "5vw 3vw",
                    borderTopRightRadius: "10vw",
                    borderTopLeftRadius: "10vw",
                    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                }}
            >
                <ButtonComponent
                    style={{ width: "100%" }}
                    title="Finalizar compra"
                    onClick={() => finishOrder()}
                    disabled={cart.products.length == 0}
                >
                    Finalizar compra
                </ButtonComponent>
            </Box>
        </Drawer>
    )
}
