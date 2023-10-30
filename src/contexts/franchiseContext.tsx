import { createContext, useState } from "react"
import React from "react"

interface FranchiseContextValue {
    franchise: number
}

interface FranchiseProviderProps {
    children: React.ReactNode
}

const FranchiseContext = createContext<FranchiseContextValue>({} as FranchiseContextValue)

export default FranchiseContext

export const FranchiseProvider: React.FC<FranchiseProviderProps> = ({ children }) => {
    const [franchise, setFranchise] = useState(1)

    return <FranchiseContext.Provider value={{ franchise }}>{children}</FranchiseContext.Provider>
}
