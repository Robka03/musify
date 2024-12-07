import config from "../../config";
import { useUser } from "../context/UserContext";
import LiquidWarp from "../liquidwarp/LiquidWarp";
import * as THREE from "three";

export default function Profile() {
    const { user, setUser } = useUser();
    console.log(user);
    return (
        <div className="d-flex align-items-center justify-content-center position-relative" style={{ height: "100vh", overflow:"scroll" }}>
            <div className="container d-flex align-items-center justify-cotntent-between position-relative px-md-5 p-5 py-md-0  z-1  flex-md-row flex-column" style={{ backgroundColor: "#161616c0", color: "white" }}>
                <div className="col-md-4 col-12">
                    <img className="w-100" src={"https://i.scdn.co/image/ab67616d0000b27304ba160a6f46cd65a84f6aee"} style={{ maxWidth: "300px" }}></img>
                </div>
                <div className="col-md-8 col-12 d-flex justify-content-start align-items-md-start align-items-center flex-column p-5 position-relative">
                    <h1>Profile</h1>
                    <p>Email: {user?.email}</p>
                    <p>Username: {user?.username}</p>
                    <p>Lastname: {user?.lastname}</p>
                    <p>Firstname: {user?.firstname}</p>
                    <p>DOB: {user?.dob}</p>
                    <p>Subscription: {user?.subscription}</p>
                </div>

            </div>
            <div className="position-fixed z-0">
                <LiquidWarp background={new THREE.Color(0, 0, 0)} color={new THREE.Color(1, 1, 1)} seed={0} />
            </div>

        </div>

    )
}