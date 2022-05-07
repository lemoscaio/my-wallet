import React from "react"
import { Link } from "react-router-dom"
import leaveIcon from "./../assets/images/icons/leave.svg"

export default function Header(props) {
    return (
        <header className="main-screen__header header">
            <h2 className="header__name">Olá, {props.name}</h2>
            <Link className="header__leave" to={"/sign-in"}>
                <img src={leaveIcon} alt="Leave Icon" />
            </Link>
        </header>
    )
}
