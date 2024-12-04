import Slideshow from "../slideshow/Slideshow"
import ProductContainer from "../productcontainer/ProductContainer"
//import matefinal from "../../assets/matefinal.png"
//import tetkofinal from "../../assets/tetkofinal.png"
import ProductContainerHandler from "../productcontainer/ProductContainerHandler"
import ImgCreatorHandler from "../imgcreator/ImgCreatorHandler"
import LiquidWarp from "../liquidwarp/LiquidWarp"

export default function Main() {
    return (
        <div className="main">
            <Slideshow />


            <div className="container p-0" style={{ backgroundColor: "#f6f9fc" }}>
                <ProductContainerHandler />
            </div>
            <LiquidWarp/>
            <div className="container p-0" style={{ backgroundColor: "#f6f9fc" }}>
                <ImgCreatorHandler/>
            </div>

        </div>
    )
}