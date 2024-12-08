import { useState } from "react";
import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import { useUser } from "../context/UserContext";
import LiquidWarp from "../liquidwarp/LiquidWarp";
import * as THREE from "three";
import API from "../../network/axios";

const API_BASE_URL = '/users';

export default function Profile() {
    const [editing, setEditing] = useState(false);
    const { user } = useUser();
    const image = user && user.image && JSON.parse(user?.image);
    const [newImage, setNewImage] = useState("");
    return (
        <div className="d-flex align-items-center justify-content-center position-relative" style={{ height: "100vh", overflow: "scroll" }}>
            <div className="container rounded d-flex align-items-center justify-cotntent-between position-relative px-md-5 p-5 py-md-0  z-1  flex-md-row flex-column" style={{ backgroundColor: "#161616c0", color: "white" }}>
                <div className="col-md-4 col-12">
                    <img className="w-100 rounded" src={(user && user.image && JSON.parse(user?.image).image) ?? "https://i.scdn.co/image/ab67616d0000b27304ba160a6f46cd65a84f6aee"} alt="product" style={{ maxWidth: "300px", aspectRatio:"1/1" }}></img>
                    <div onClick={() => { setEditing(true) }}>EDIT</div>
                    {editing &&
                        <>
                            <Input title="New image link" type="url" handleChange={(e: any) => { setNewImage(e.target.value); }} />
                            <Button text="Save" buttonStyle="btn-success" onClick={() => { if (newImage != "") API.post(API_BASE_URL + "/image", {"image":newImage}) }} />
                        </>
                    }
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