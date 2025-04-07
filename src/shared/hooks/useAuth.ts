import { useDispatch, useSelector } from "react-redux"
import { StoreInterface } from "../../store"
import { fetchUser } from "../../store/login/action"

const useAuth = () => {
    const token = useSelector((state: StoreInterface) => state.login.token)
    let isLogged = false
    const dispatch = useDispatch()
    dispatch(fetchUser())
    if(token)
        isLogged = true

    return isLogged
}

export default useAuth