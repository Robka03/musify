
import classes from "./ProductContainer.module.css";

export default function ProductDashes(){
    return (
        <div className={classes.borderDivContainer + " container d-md-flex d-none"}>
            <div className={"col-5 "+classes.borderDiv}>

            </div>
            <div className={"col-2 "+classes.borderDiv}>

            </div>
            <div className={"col-5 "+classes.borderDiv}>

            </div>
        </div>
    )
}