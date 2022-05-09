import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Statement(props) {
    const { description, type, value, date, _id } = props
    const [isClicked, setIsClicked] = useState(false)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    function setIsClickedCSS() {
        return isClicked ? "statements__item--clicked" : ""
    }

    function handleEditClick(e) {
        e.stopPropagation()
        navigate(`./new-entry/edit`, {
            state: { description, value, type, _id },
        })
    }

    function handleDeleteClick(e) {
        e.stopPropagation()
        axios
            .delete(`${process.env.REACT_APP_API_URL}/statements/${_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                e.target.parentNode.parentNode.remove()
            })
        return
    }

    function setComplementaryButtonsContent() {
        if (isClicked) {
            return (
                <div className="statements__item-secondary-content">
                    <button
                        className="statements__button statements__button--left"
                        onClick={(e) => handleEditClick(e)}
                    >
                        Editar
                    </button>
                    <button
                        className="statements__button statements__button--right"
                        onClick={(e) => handleDeleteClick(e)}
                    >
                        Excluir
                    </button>
                </div>
            )
        } else return <></>
    }

    return (
        <li
            className={`statements__item ${setIsClickedCSS()}`}
            onClick={() => {
                setIsClicked(!isClicked)
            }}
        >
            <div className="statements__item-main-content">
                {" "}
                <div className="statements__item-first-collumn">
                    <h1 className="statements__date">{date}</h1>
                    <h1 className="statements__description">{description}</h1>
                </div>
                <h1
                    className={`statements__value ${
                        type === "deposit"
                            ? "positive-number"
                            : "negative-number"
                    }`}
                >
                    {value}
                </h1>
            </div>
            {setComplementaryButtonsContent()}
        </li>
    )
}
