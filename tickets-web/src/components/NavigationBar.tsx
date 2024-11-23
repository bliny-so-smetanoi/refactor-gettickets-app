import {Link, useNavigate} from "react-router-dom";
import { useAuthDispatch, useAuthSelector } from "../hooks/useAuthDispatch";
import { logout, selectAuth } from "../store/auth/auth.slice";

export default function NavigationBar() {
    const navigate = useNavigate();
    const {isAuth} = useAuthSelector(selectAuth);
    const dispatch = useAuthDispatch();
    return (
        <nav className="bg-cyan-200 text-center flex justify-around">
            <Link to="/" className="basis-1/2 p-3 text-xl">
                Get Tickets™
            </Link>
            <Link className="basis-1/3 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3" to="/">
                Home
            </Link>
            <Link to="/" className="basis-1/3 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3">
                About us
            </Link>
            <Link to="/" className="basis-1/3 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3">
                Feedback
            </Link>
            {isAuth && <Link to="/profile" className="basis-1/3 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3">
                Profile
            </Link>}
            {
                !isAuth &&
                <Link to="/auth" className="basis-1/6 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3">
                    Sign in
                </Link>
            }
            {
                isAuth &&
                <button onClick={() => {
                    dispatch(logout())
                    navigate('/auth')
                }} className="basis-1/6 hover:text-lg hover:duration-300 hover:text-white hover:bg-cyan-300 p-3">
                    Log out
                </button>
            }
        </nav>
    );
}