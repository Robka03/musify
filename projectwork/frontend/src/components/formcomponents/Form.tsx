import classes from "./Form.module.css"

interface FormProps {
    handleSubmit: (e: React.FormEvent) => void
    children: React.ReactNode
}

export default function Form({ handleSubmit, children }: FormProps) {
    return (
        <div className={classes.pageContainer + " position-relative z-1"}>
            <div className={classes.container} style={{ paddingTop: "3.5rem" }}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        </div>
    )

}