import React from "react"
import { Link, useLocation } from "react-router-dom"

import leaveIcon from "./../assets/images/icons/leave.svg"

export default function Header(props) {
    const location = useLocation()
    const path = location.pathname

    function signOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    function setHeaderContent() {
        switch (path) {
            case "/new-entry/deposit":
            case "/new-entry/withdraw":
                return (
                    <>
                        <h2 className="header__name">Nova {props.name}</h2>
                    </>
                )
            case "/new-entry/edit":
                return (
                    <>
                        <h2 className="header__name">Editar {props.name}</h2>
                    </>
                )
            default:
                return (
                    <>
                        <h2 className="header__name">Olá, {props.name}</h2>
                        <Link
                            className="header__leave"
                            to={"/sign-in"}
                            onClick={signOut}
                        >
                            <img src={leaveIcon} alt="Leave Icon" />
                        </Link>
                    </>
                )
        }
    }

    return <header className="header">{setHeaderContent()}</header>
}
