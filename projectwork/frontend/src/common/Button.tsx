import React from "react";
import {useState} from "react";

interface ButtonProps {
    text: string;
}

export default function Button({text}: ButtonProps) {
    const [value, setValue] = useState(false);
    const valueRef = React.useRef(false);

    return(
        <div onClick={()=>{setValue(!value);valueRef.current = !value;console.log(valueRef.current)}} style={{backgroundColor: value ? "#ff00ff" : "#ff0000"}}>
            { value ? text : "OFF" }
        </div>
    )
}