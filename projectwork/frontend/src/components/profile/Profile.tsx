import { useUser } from "../context/UserContext";

export default function Profile() {
    const { user, setUser } = useUser();
    console.log(user);
    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <p>Lastname: {user?.lastname}</p>
            <p>Firstname: {user?.firstname}</p>
            <p>DOB: {user?.dob}</p>
            <p>Subscription: {user?.subscription}</p>
        </div>
    )
}