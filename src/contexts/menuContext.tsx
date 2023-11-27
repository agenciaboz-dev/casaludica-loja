import { createContext, useState } from "react"
import React from "react"

interface MenuContextValue {
    open: boolean
    setOpen: (value: boolean) => void
}

interface MenuProviderProps {
    children: React.ReactNode
}

const MenuContext = createContext<MenuContextValue>({} as MenuContextValue)

export default MenuContext

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)

    return <MenuContext.Provider value={{ open: open, setOpen: setOpen }}>{children}</MenuContext.Provider>
}
