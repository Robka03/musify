import Slideshow from "../slideshow/Slideshow"
import ProductContainer from "../productcontainer/ProductContainer"
//import matefinal from "../../assets/matefinal.png"
//import tetkofinal from "../../assets/tetkofinal.png"
import ProductContainerHandler from "../productcontainer/ProductContainerHandler"
import ImgCreatorHandler from "../imgcreator/ImgCreatorHandler"
import LiquidWarp from "../liquidwarp/LiquidWarp"
import * as THREE from "three"

export default function Main() {
    return (
        <div className="main">
            <Slideshow />


            <div className="container p-0" style={{ backgroundColor: "#f6f9fc" }}>
                <ProductContainerHandler />
            </div>
            <div className="position-relative" style={{height:"50vh"}}>
            <div className="position-absolute"><LiquidWarp seed={500} color={new THREE.Color(0,1,1)} background={new THREE.Color(0,0,0)}/></div>
            </div>
            
            <div className="container p-0" style={{ backgroundColor: "#f6f9fc" }}>
                <ImgCreatorHandler/>
            </div>

        </div>
    )
}