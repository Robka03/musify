import classes from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    name?: string;
    note?: string;
}

export default function Input({ handleChange, title, note, ...props }: InputProps) {
    return (
        <>
            {title && <div style={{ textAlign: "left" }}><span className={classes.title}>{title}</span><span className="ms-2">{note}</span></div>}
            <input type="text" onChange={handleChange} className={classes.input} {...props} />
        </>

    )
}