import classes from "./ProductContainer.module.css";

export default function ImageContainer({children}:any) {
    return (
        <div className="col-md-5 col-12 d-flex align-items-center justify-content-center z-1">
            <div className={classes.productImageContainer + " m-5 "}>
                {children}
            </div>
        </div>
    )

}