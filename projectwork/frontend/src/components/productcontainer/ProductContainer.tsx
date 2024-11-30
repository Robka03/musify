import { alignPropType } from "react-bootstrap/esm/types";
import classes from "./ProductContainer.module.css";

//TODO: Betölthető TXT fileok amiket értelmez a modul, majd a megfelelő képekkel és szövegekkel feltölti a ProductContainer komponenseket, meghívni a Main.txt-ben egy Product handlerben lehetne esetleg.

interface ProductContainerProps {
    image: string;
    imgDescription: string;
    title: string;
    description: string;
    bg?: string;
    direction?: "left" | "right";
}

export default function ProductContainer({ image, imgDescription, title, description, bg , direction = "left" }: ProductContainerProps) {
    return (
        <div className={"product-container d-flex " + (direction == "left" ? "flex-row" : "flex-row-reverse")} style={{background: bg}}>
            <div className="col-5 d-flex align-items-center justify-content-center">
                <div className={classes.productImageContainer+ " m-5 "}>
                    <img src={image} className={"rounded-3 "+classes.productImage}/>
                    <p className="p-3">{imgDescription}</p>
                </div>
                
            </div>
            <div className="p-5 d-flex flex-column align-items-center justify-content-center">
                <h3 style={{marginRight:"auto"}}>{title}</h3>
                <p style={{textAlign:"justify"}}>{description}</p>
            </div>
        </div>
    )
}