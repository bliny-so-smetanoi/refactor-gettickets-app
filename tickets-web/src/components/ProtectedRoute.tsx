import { selectAuth } from "../store/auth/auth.slice"
import { useAuthSelector } from "../hooks/useAuthDispatch"

export const ProtectedRoute = ({children}: any) => {
    const {isAuth} = useAuthSelector(selectAuth);
    if (isAuth) {
        return children
    }
    else 
        return (
    <>
        <div>Unauth 401</div>
    </>
    )
}