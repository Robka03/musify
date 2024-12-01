import classes from "./Input.module.css";

interface InputProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
}

export default function Input({ handleChange, title }: InputProps) {
    return (
        <>
            {title && <div style={{textAlign:"left"}}><span className={classes.title}>{title}</span></div>}
            <input type="text" onChange={handleChange} className={classes.input} />
        </>

    )
}