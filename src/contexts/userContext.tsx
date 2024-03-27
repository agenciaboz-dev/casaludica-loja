import { createContext, useEffect, useState } from "react"
import React from "react"
import { api, bozpayApi } from "../api"
import { useFranchise } from "../hooks/useFranchise"
import { Order } from "boz.pay.component"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const { franchise } = useFranchise()
    const [user, setUser] = useState<User | null>(null)

    const handleShippedOrders = async (user: User) => {
        if (!franchise) return
        const response = await api.post("/order/user", { user_id: user.id, store_id: franchise.id })
        const orders = response.data.orders as Order[]
        const shipped_orders = orders.filter((order) => order.status == "Em trânsito")
        console.log("pedidos em transito")
        console.log(shipped_orders)
        // confirmar entrega e avaliação dos produtos
    }

    useEffect(() => {
        if (user) {
            handleShippedOrders(user)
        }
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
