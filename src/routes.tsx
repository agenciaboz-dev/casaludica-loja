import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Box } from "@mui/material"
import { Home } from "./pages/Home"
import { Results } from "./pages/Results"
import { Product } from "./pages/Product"
import { Checkout } from "./components/Checkout"
import { Order } from "./pages/Order"
import { Login } from "./pages/Login"
import { FirstLogin } from "./pages/FirstLogin"
import { Collections } from "./pages/Collections"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/search" element={<Results />} />
            <Route path="/search/:type" element={<Results />} />
            <Route path="/search/:type/:value" element={<Results />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />

            <Route path="/login" element={<Login />} />
            <Route path="/first_login" element={<FirstLogin />} />

            <Route path="/collections" element={<Collections />} />
        </ReactRoutes>
    )
}
