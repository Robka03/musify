import { CSSProperties } from "react"
import logo from "../../assets/logo1024.png"
import { listenerCount } from "process"
import classes from "./Navbar.module.css"
import { randomBytes } from "crypto"

export default function Navbar() {
    return (
        <>
            <nav className={classes.navbar}>
                <div className="container position-relative d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between py-1 p-0 px-2 z-1">
                    <a href="/" className="navbar-brand d-flex align-items-center ms-3" style={{ cursor: "pointer" }}><div style={{maskImage:`url('${logo}')`, maskSize:"contain",backgroundColor:"#f6f9fc", height: "2.5rem", aspectRatio:"1/1"}}></div><h3 className="p-0 m-0 mt-2 ms-2">Musify</h3></a>
                    <ul className="d-flex flex-row m-0">
                        <NavbarItem text="About" redirect="" />
                        <NavbarItem text="Cart" redirect="" />
                        <NavbarItem text={false ? "Profile" : "Login"} redirect={false ? "/login" : "profile"} />
                    </ul>
                </div>
            </nav>
        </>

    )
}

interface NavbarItemProps {
    text: string;
    redirect: string;
}

function NavbarItem({ text, redirect }: NavbarItemProps) {
    return (
        <li className={"p-2 d-flex align-items-center " + classes.list}><a href={redirect} className={classes.listElement + " mt-1"}>{text}</a></li>
    )
}