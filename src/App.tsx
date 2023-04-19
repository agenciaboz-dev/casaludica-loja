import React from 'react';
import './sass/_all.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from './hooks/useMuiTheme';

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                </Routes>

            </BrowserRouter>

        </ThemeProvider>
  )
}

export default App;
