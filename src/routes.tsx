import React, { useEffect } from "react"
import { Routes as ReactRoutes, Route, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { Results } from "./pages/Results"
import { Product } from "./pages/Product"
import { Checkout } from "./components/Checkout"
import { Order } from "./pages/Order"
import { Login } from "./pages/Login"
import { FirstLogin } from "./pages/FirstLogin"
import { Collections } from "./pages/Collections"
import { Categories } from "./pages/Categories"
import { Orders } from "./pages/Orders"
import { Profile } from "./pages/Profile"
import { FirstPassword } from "./pages/FirstPassword"
import { LoginCheck } from "./pages/LoginCheck"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const pathname = useLocation().pathname

    useEffect(() => {
        window.scrollTo({ behavior: "smooth", top: 0 })
    }, [pathname])

    return (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/search" element={<Results />} />
            <Route path="/search/:type" element={<Results />} />
            <Route path="/search/:type/:value" element={<Results />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />

            <Route path="/signup" element={<p>tem que fazer</p>} />
            <Route path="/login" element={<Login />} />
            <Route path="/login_checker" element={<LoginCheck />} />
            <Route path="/first_login" element={<FirstLogin />} />
            <Route path="/first_password/:hash" element={<FirstPassword />} />

            <Route path="/collections" element={<Collections />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
        </ReactRoutes>
    )
}
