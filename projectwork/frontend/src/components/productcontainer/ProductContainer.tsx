import { alignPropType } from "react-bootstrap/esm/types";
import classes from "./ProductContainer.module.css";
import ProductDashes from "./ProductDashes";
import ImageContainer from "./ImageContainer";

//TODO: Betölthető JSON adatok amiket értelmez a modul, majd a megfelelő képekkel és szövegekkel feltölti a ProductContainer komponenseket, a Main.tsx-ben egy Product handlerben lehetne esetleg.

interface ProductContainerProps {
    image: string;
    imgDescription: string;
    title: string;
    description: string;
    bg?: string;
    direction?: "left" | "right";
}

export default function ProductContainer({ image, imgDescription, title, description, bg, direction = "left" }: ProductContainerProps) {
    return (
        <div className={classes.productContainer + " d-flex flex-wrap position-relative " + (direction == "left" ? "flex-row" : "flex-row-reverse")} style={{ background: bg }}>
            <ImageContainer>
                <img src={image} className={"rounded-3 " + classes.productImage} />
                <p className="p-3">{imgDescription}</p>
            </ImageContainer>
            <div className="col-md-7 col-12  p-5 d-flex flex-column align-items-center justify-content-center z-1">
                <h3 style={{ marginRight: "auto" }}>{title}</h3>
                <p style={{ marginRight: "auto", textAlign: "left" }}>{description}</p>
            </div>
            <ProductDashes />
        </div>
    )
}