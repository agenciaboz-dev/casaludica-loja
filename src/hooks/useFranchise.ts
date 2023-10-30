import { useContext } from "react"
import FranchiseContext from "../contexts/franchiseContext"

export const useFranchise = () => {
    const franchiseContext = useContext(FranchiseContext)
    const { franchise } = franchiseContext

    return { franchise }
}
