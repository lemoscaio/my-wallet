import React from "react"
import { useNavigate } from "react-router-dom"
import plusIcon from "./../assets/images/icons/plus.svg"
import minusIcon from "./../assets/images/icons/minus.svg"

export default function Footer() {
    const navigate = useNavigate()

    function moveToNewEntry(type) {
        navigate(`./new-entry/${type}`)
    }

    return (
        <footer className="main-screen__buttons">
            <button
                className="main-screen__button"
                onClick={() => moveToNewEntry("deposit")}
            >
                <img src={plusIcon} alt="Add new Deposit Icon" />
                <p className="main-screen__button-label">Nova entrada</p>
            </button>
            <button
                className="main-screen__button"
                onClick={() => moveToNewEntry("withdraw")}
            >
                <img src={minusIcon} alt="Add new Withdraw Icon" />
                <p className="main-screen__button-label">Nova saída</p>
            </button>
        </footer>
    )
}
