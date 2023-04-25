import { useContext } from 'react'
import LoadingContext from '../contexts/loadingContext'

export const useLoading = () => {
    const loadingContext = useContext(LoadingContext);

    return {loading: loadingContext.value, setLoading: loadingContext.setValue}
}