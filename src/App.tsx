import React from 'react';
import './sass/_all.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from './hooks/useMuiTheme';
import { CartProvider } from './contexts/cartContext';

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <CartProvider>

                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                    </Routes>

                </BrowserRouter>

            </CartProvider>
        </ThemeProvider>
  )
}

export default App;
