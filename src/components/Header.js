import React from "react"
import { Link } from "react-router-dom"
import leaveIcon from "./../assets/images/icons/leave.svg"

export default function Header(props) {

    function signOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <header className="main-screen__header header">
            <h2 className="header__name">Olá, {props.name}</h2>
            <Link className="header__leave" to={"/sign-in"} onClick={signOut}>
                <img src={leaveIcon} alt="Leave Icon" />
            </Link>
        </header>
    )
}
