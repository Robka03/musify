import LiquidWarp from "../liquidwarp/LiquidWarp";
import RegistrationForm from "./RegistrationForm";
import * as THREE from "three";

export default function RegistrationContainer() {

    return (
        <div>
            <RegistrationForm />
            <div className="position-fixed start-0 top-0 z-0">
                <LiquidWarp background={new THREE.Color(0, 0, 0)} color={new THREE.Color(1, 1, 1)} seed={0} />
            </div>
        </div>

    )
}