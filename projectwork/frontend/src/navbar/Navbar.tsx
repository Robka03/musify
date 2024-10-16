import React from "react";

export default function Navbar() {
    return(
        <nav className="navbar">
            <div className="navbar-brand"><h1>Musify</h1></div>
            <ul className="d-flex flex-row">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}