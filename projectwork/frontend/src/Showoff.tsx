import React from "react";

export default function Showoff() {

    return (
        <>
            <p>
                <Gomb />
                Kép meg miegymás
            </p>
        </>
    )
}

function Gomb() {
    const [gomb, setGomb] = React.useState(false);
    return (
        <>
            <input type={gomb ? "text" : "password"}></input>
            <div className={gomb ? "on" : "off"} onClick={() => setGomb(!gomb)}>{gomb ? "Csukott Szem ikon" : "Nyitott szem ikon"}</div>
        </>

    )
}