import classes from "./Button.module.css";

interface ButtonProps {
    text: string;
    onClick: () => void;
    buttonStyle?: "btn-primary" | "btn-secondary" | "btn-danger" | "btn-success" | "btn-dark" | "btn-light";
}

export default function Button({ text, onClick, buttonStyle="btn-primary" }: ButtonProps) {
    return (
        <button onClick={onClick} className={classes.button + " btn " + buttonStyle}>{text}</button>
    )
}