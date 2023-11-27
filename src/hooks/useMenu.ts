import { useContext } from "react"
import MenuContext from "../contexts/menuContext"

export const useMenu = () => {
    const menuContext = useContext(MenuContext)
    const { open, setOpen } = menuContext

    return { open, setOpen }
}
