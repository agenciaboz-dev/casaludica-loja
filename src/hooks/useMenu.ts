import { useContext } from "react"
import MenuContext from "../contexts/menuContext"

export const useMenu = () => {
    const menuContext = useContext(MenuContext)
    const { open, setOpen, havePassword, setHavePassword, loginString, setLoginString, renderForm, setRenderForm } =
        menuContext

    return { open, setOpen, havePassword, setHavePassword, loginString, setLoginString, renderForm, setRenderForm }
}
