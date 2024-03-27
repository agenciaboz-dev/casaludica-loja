import { createContext, useEffect, useState } from "react"
import React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Franchise } from "../types/server/class/Franchise"

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

    const [franchise, setFranchise] = useState<Franchise | undefined>(storage.get("franchise"))
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>(storage.get("address"))

    const bozpayStoreIdentifier = `casaludica.mkt-${franchise?.id}`

    useEffect(() => {
        console.log({ franchise })
    }, [franchise])

    return (
        <FranchiseContext.Provider value={{ bozpayStoreIdentifier, franchise, setFranchise, currentAddress, setCurrentAddress }}>
            {children}
        </FranchiseContext.Provider>
    )
}
