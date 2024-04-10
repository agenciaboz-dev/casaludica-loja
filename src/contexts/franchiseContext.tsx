import { createContext, useEffect, useRef, useState } from "react"
import React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Franchise } from "../types/server/class/Franchise"
import { api } from "../api"

interface FranchiseContextValue {
    bozpayStoreIdentifier: string
    franchise?: Franchise
    setFranchise: React.Dispatch<React.SetStateAction<Franchise | undefined>>

    currentAddress?: Address
    setCurrentAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
}

interface FranchiseProviderProps {
    children: React.ReactNode
}

const FranchiseContext = createContext<FranchiseContextValue>({} as FranchiseContextValue)

export default FranchiseContext

export const FranchiseProvider: React.FC<FranchiseProviderProps> = ({ children }) => {
    const storage = useLocalStorage()
    const first_render = useRef(true)

    const [franchise, setFranchise] = useState<Franchise | undefined>(storage.get("franchise"))
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>(storage.get("address"))

    const bozpayStoreIdentifier = `casaludica.mkt-${franchise?.id}`

    const refresh = async (id: number) => {
        try {
            const response = await api.post("/franchise/refresh", { franchise_id: id })
            setFranchise(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log({ franchise })
        if (franchise && first_render.current) {
            refresh(franchise.id)
            first_render.current = false
        }
    }, [franchise])

    return (
        <FranchiseContext.Provider value={{ bozpayStoreIdentifier, franchise, setFranchise, currentAddress, setCurrentAddress }}>
            {children}
        </FranchiseContext.Provider>
    )
}
