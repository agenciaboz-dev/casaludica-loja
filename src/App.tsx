import React from 'react';
import './sass/_all.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from './hooks/useMuiTheme';
import { CartProvider } from './contexts/cartContext';
import { ProductsProvider } from './contexts/productsContext';
import { Results } from './pages/Results';
import { LoadingProvider } from './contexts/loadingContext';
import { CategoriesProvider } from './contexts/categoriesContext';
import { Product } from "./pages/Product"
import { Checkout } from "./components/Checkout"
import { FranchiseProvider } from "./contexts/franchiseContext"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <FranchiseProvider>
                <LoadingProvider>
                    <CategoriesProvider>
                        <ProductsProvider>
                            <CartProvider>
                                <BrowserRouter>
                                    <Routes>
                                        <Route index element={<Home />} />
                                        <Route path="/search" element={<Results />} />
                                        <Route path="/search/:type" element={<Results />} />
                                        <Route path="/search/:type/:value" element={<Results />} />
                                        <Route path="/product/:id" element={<Product />} />
                                        <Route path="/checkout" element={<Checkout />} />
                                    </Routes>
                                </BrowserRouter>
                            </CartProvider>
                        </ProductsProvider>
                    </CategoriesProvider>
                </LoadingProvider>
            </FranchiseProvider>
        </ThemeProvider>
    )
}

export default App;
