
import classes from "./ProductContainer.module.css";

export default function ProductDashes(){
    return (
        <div className={classes.borderDivContainer + " container"}>
            <div className={"col-5 "+classes.borderDiv}>

            </div>
            <div className={"col-2 "+classes.borderDiv}>

            </div>
            <div className={"col-5 "+classes.borderDiv}>

            </div>
        </div>
    )
}