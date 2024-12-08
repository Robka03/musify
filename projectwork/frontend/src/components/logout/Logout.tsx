import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Logout() {
    const navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useUser();
    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
    },[navigate, setIsLoggedIn, setUser])
    return (
        <div>
            <h1>Logging out</h1>
        </div>
    )
}