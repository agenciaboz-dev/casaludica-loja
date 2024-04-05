import { createContext, useState } from "react"
import React from "react"

interface MenuContextValue {
    open: boolean
    setOpen: (value: boolean) => void
    havePassword: boolean
    setHavePassword: (value: boolean) => void
    loginString: string
    setLoginString: (value: string) => void
    renderForm: false | "login" | "signup"
    setRenderForm: (value: false | "login" | "signup") => void
}

interface MenuProviderProps {
    children: React.ReactNode
}

const MenuContext = createContext<MenuContextValue>({} as MenuContextValue)

export default MenuContext

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [renderForm, setRenderForm] = useState<false | "login" | "signup">(false)
    const [havePassword, setHavePassword] = useState(false)
    const [loginString, setLoginString] = useState("")

    return (
        <MenuContext.Provider
            value={{
                open: open,
                setOpen: setOpen,
                havePassword,
                setHavePassword,
                loginString,
                setLoginString,
                renderForm,
                setRenderForm,
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}
