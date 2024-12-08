import LiquidWarp from "../liquidwarp/LiquidWarp";
import * as THREE from "three";

export default function NotFound() {
    return (
        <div className="position-relative" style={{ height: "100vh", width: "100vw" }}>
            <div className="w-100 h-100 position-relative z-0">
                <LiquidWarp seed={500} color={new THREE.Color(0, 1, 1)} background={new THREE.Color(0, 0, 0)} />
            </div>
            <div className="d-flex justify-content-center align-items-center position-absolute z-2 start-50 top-50 translate-middle" style={{ backgroundColor: "black" }}>
                <img src="/empty.jpg" alt="" className="w-50 m-3" style={{ minWidth: "25vw" }}></img>
                <div className="w-50 m-3 d-flex flex-column align-items-end justify-content-between" style={{ textAlign: "left", color: "white", minWidth: "25vw", height:"25vw" }}>
                    <h4>404 (Page not found)</h4>
                    <div>
                        <img src="/empty_code.png" alt="" className="w-100"></img>
                        <h1>Empty</h1>
                        <h3>Juice WRLD</h3>
                    </div>

                </div>
            </div>
        </div>

    )
}