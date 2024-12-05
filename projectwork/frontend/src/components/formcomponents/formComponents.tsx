import classes from "./formComponents.module.css"

interface FormGroupProps {
    label: string | React.ReactNode
    type: React.HTMLInputTypeAttribute
    idAndName: string
    defaultValue: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

interface FormCheckBoxGroupProps {
    label: string | React.ReactNode
    idAndName: string
    value: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export function FormCheckboxGroup({ label, idAndName, value, onChange }: FormCheckBoxGroupProps) {
    return (
        <div className={classes.formGroup + " d-flex justify-content-between"}>
            <label className={classes.checkboxLabel}>
                <div>{label}</div>
            </label>
            <input
                type="checkbox"
                id={idAndName}
                name={idAndName}
                checked={value}
                onChange={onChange}
                required
                className={classes.checkbox}
                style={{ marginBottom: ".5rem", width: "auto" }}
            />
        </div>
    )
}

export function FormGroup({ label, type, idAndName, defaultValue, onChange, placeholder = "" }: FormGroupProps) {
    if (placeholder === "") {
        placeholder = "Enter your " + label;
    }
    return (
        <div className={classes.formGroup}>
            <label htmlFor="lastName" style={{ marginBottom: "0px" }}>{label}</label>
            <input
                type={type}
                id={idAndName}
                name={idAndName}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                required
                className={classes.input}
            />
        </div>
    )

}

