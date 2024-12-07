import config from "../../config";
import { useUser } from "../context/UserContext";

export default function Profile() {
    const { user, setUser } = useUser();
    console.log(user);
    return (
        <div>
            <h1>Profile</h1>
            <img src={"https://i.scdn.co/image/ab67616d0000b27304ba160a6f46cd65a84f6aee"}></img>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <p>Lastname: {user?.lastname}</p>
            <p>Firstname: {user?.firstname}</p>
            <p>DOB: {user?.dob}</p>
            <p>Subscription: {user?.subscription}</p>
        </div>
    )
}