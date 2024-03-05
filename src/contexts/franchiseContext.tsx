import { createContext, useEffect, useState } from "react"
import React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Franchise } from "../types/server/class/Franchise"

interface FranchiseContextValue {
    franchise_id: number
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

    const [franchise_id, setFranchiseId] = useState(1)
    const [franchise, setFranchise] = useState<Franchise | undefined>(storage.get("franchise"))
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>(storage.get("address"))

    const bozpayStoreIdentifier = `casaludica.mkt-${franchise_id}`

    useEffect(() => {
        console.log(franchise)
        if (franchise) {
            setFranchiseId(franchise.id)
        }
    }, [franchise])

    return (
        <FranchiseContext.Provider value={{ franchise_id, bozpayStoreIdentifier, franchise, setFranchise, currentAddress, setCurrentAddress }}>
            {children}
        </FranchiseContext.Provider>
    )
}
