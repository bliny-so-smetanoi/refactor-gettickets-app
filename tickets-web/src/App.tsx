import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NavigationBar from "./components/NavigationBar";
import EventPage from "./pages/EventPage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import { useAuthDispatch } from "./hooks/useAuthDispatch";
import { useEffect } from "react";
import { setUser } from "./store/auth/auth.slice";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
    const dispatch = useAuthDispatch();
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
        dispatch(setUser(user))
    }, [])

  return (
    <>
    <BrowserRouter>
        <NavigationBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'auth'} element={<AuthPage/>}/>
                <Route path={'event/:id'} element={<EventPage/>}/>
                <Route path={'profile'} element={
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>
                    }/>
                <Route path={'*'} element={<HomePage/>}/>
            </Routes>
        <Footer/>
    </BrowserRouter>
    </>    
  );
}

export default App;
