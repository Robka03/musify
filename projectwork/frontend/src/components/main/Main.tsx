import Slideshow from "../slideshow/Slideshow"
import ProductContainer from "../productcontainer/ProductContainer"
import matefinal from "../../assets/matefinal.png"
import tetkofinal from "../../assets/tetkofinal.png"

export default function Main() {
    return(
        <div className="main">
            <Slideshow/>
            <div className="container p-0" style={{backgroundColor: "#f6f9fc"}}>
            <ProductContainer image={matefinal} imgDescription={matefinal} title="Sári" description="sss" direction="left"/>
            <ProductContainer image={tetkofinal} imgDescription={tetkofinal} title="Tetko" description="sss" direction="right"/>
            </div>
            <Slideshow/>
            <div className="container p-0" style={{backgroundColor: "#fbf2eb"}}>
            <ProductContainer image="https://via.placeholder.com/1024" title="Placeholder" description="placeholder" imgDescription="PLACEHOLDER" direction="right"/>
            <ProductContainer image="https://via.placeholder.com/1024" title="Placeholder" description="placeholder" imgDescription="PLACEHOLDER" direction="left"/>
            </div>
            
        </div>
    )
}