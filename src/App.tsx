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

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <LoadingProvider>
                <CategoriesProvider>
                    <ProductsProvider>
                        <CartProvider>

                            <BrowserRouter>
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route path='/search' element={<Results />} />
                                </Routes>

                            </BrowserRouter>

                        </CartProvider>
                    </ProductsProvider>
                </CategoriesProvider>
            </LoadingProvider>
        </ThemeProvider>
  )
}

export default App;
