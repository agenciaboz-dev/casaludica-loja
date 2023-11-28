import React from 'react';
import './sass/_all.scss';
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from './hooks/useMuiTheme';
import { CartProvider } from './contexts/cartContext';
import { ProductsProvider } from "./contexts/productsContext"
import { LoadingProvider } from './contexts/loadingContext';
import { CategoriesProvider } from "./contexts/categoriesContext"
import { FranchiseProvider } from "./contexts/franchiseContext"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { Routes } from "./routes"
import { UserProvider } from "./contexts/userContext"
import { MenuProvider } from "./contexts/menuContext"
import { Menu } from "./components/Menu"
import { Cart } from "./components/Cart"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <MenuProvider>
                    <FranchiseProvider>
                        <LoadingProvider>
                            <CategoriesProvider>
                                <ProductsProvider>
                                    <CartProvider>
                                        <UserProvider>
                                            <BrowserRouter>
                                                <Snackbar />
                                                <Cart />
                                                <Menu />
                                                <Routes />
                                            </BrowserRouter>
                                        </UserProvider>
                                    </CartProvider>
                                </ProductsProvider>
                            </CategoriesProvider>
                        </LoadingProvider>
                    </FranchiseProvider>
                </MenuProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App;
