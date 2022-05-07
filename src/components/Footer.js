import React from "react"
import plusIcon from "./../assets/images/icons/plus.svg"
import minusIcon from "./../assets/images/icons/minus.svg"

export default function Footer() {
    return (
        <footer className="main-screen__buttons">
            <button className="main-screen__button">
                <img src={plusIcon} alt="Add new Deposit Icon" />
                <p className="main-screen__button-label">Nova entrada</p>
            </button>
            <button className="main-screen__button">
                <img src={minusIcon} alt="Add new Withdraw Icon" />
                <p className="main-screen__button-label">Nova saída</p>
            </button>
        </footer>
    )
}
