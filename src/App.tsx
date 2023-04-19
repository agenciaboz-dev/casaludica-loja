import React from 'react';
import './sass/_all.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
