import classes from "./ProductContainer.module.css";

export default function ImageContainer({children}:any) {
    return (
        <div className="col-5 d-flex align-items-center justify-content-center z-1">
            <div className={classes.productImageContainer + " m-5 "}>
                {children}
            </div>
        </div>
    )

}