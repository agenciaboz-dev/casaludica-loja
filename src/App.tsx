import React from 'react';
import './sass/_all.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from './hooks/useMuiTheme';
import { CartProvider } from './contexts/cartContext';
import { ProductsProvider } from './contexts/productsContext';
import { Results } from './pages/Results';

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
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
        </ThemeProvider>
  )
}

export default App;
