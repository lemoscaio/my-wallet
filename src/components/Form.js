import React, { useState } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import InputMask from "react-input-mask"
import CurrencyInput from "react-currency-input-field"
import axios from "axios"

// const API_URL = "https://caio-lemos-my-wallet.herokuapp.com"
const API_URL = "http://localhost:5000"

export default function Form() {
    const navigate = useNavigate()
    const location = useLocation()
    const { entryType } = useParams()

    const path = location.pathname
    const token = localStorage.getItem("token")

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    const [value, setValue] = useState()
    const [description, setDescription] = useState("")

    function handleSubmit(e) {
        switch (path) {
            case "/sign-in":
                e.preventDefault()
                axios
                    .post(`${API_URL}/sign-in`, { email, password })
                    .then((response) => {
                        // console.log(response);

                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("user", response.data.name)
                        navigate("/")
                    })
                    .catch((error) => {
                        console.log(error.response.status)
                        console.log(error.response.data)
                    })
                break

            case "/sign-up":
                e.preventDefault()
                axios
                    .post(`${API_URL}/sign-up`, { name, email, password })
                    .then((response) => {
                        console.log(response)
                        navigate("/sign-in")
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log(error.response.status)
                        console.log(error.response.data)
                    })
                break

            case "/new-entry/deposit":
            case "/new-entry/withdraw":
                e.preventDefault()

                axios
                    .post(
                        `${API_URL}/statements`,
                        {
                            value,
                            description,
                            type: entryType,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response)
                        navigate("/")
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log(error.response.status)
                        console.log(error.response.data)
                    })
                break

            default:
                break
        }
    }

    function cancelAndReturn() {
        setValue("")
        setDescription("")
        navigate(-1)
        return
    }

    function setFormContent() {
        switch (path) {
            case "/sign-in":
                return (
                    <>
                        <form
                            className="sign__form form"
                            onSubmit={handleSubmit}
                        >
                            <input
                                required
                                className="form__input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <input
                                required
                                className="form__input"
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <button type="submit" className="form__button">
                                Entrar
                            </button>
                            <Link
                                className="form__link-to-sign-up"
                                to={"/sign-up"}
                            >
                                Primeira vez? Cadastre-se!
                            </Link>
                        </form>
                    </>
                )

            case "/sign-up":
                return (
                    <form className="sign__form form" onSubmit={handleSubmit}>
                        <input
                            required
                            className="form__input"
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <input
                            required
                            className="form__input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <input
                            required
                            className="form__input"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <input
                            required
                            className="form__input"
                            type="password"
                            placeholder="Confirme a senha"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordConfirmation(e.target.value)
                            }}
                        />
                        <button type="submit" className="form__button">
                            Cadastrar
                        </button>
                        <Link className="form__link-to-sign-in" to={"/sign-in"}>
                            Primeira vez? Cadastre-se!
                        </Link>
                    </form>
                )

            case "/new-entry/deposit":
            case "/new-entry/withdraw":
                return (
                    <form className="sign__form form" onSubmit={handleSubmit}>
                        <CurrencyInput
                            required
                            className="form__input"
                            allowNegativeValue={false}
                            placeholder="Valor (Ex.: 50,00)"
                            step="1"
                            min="10"
                            maxLength="7"
                            // value={value}
                            onValueChange={(value) => setValue(value)}
                        />
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Descrição (opcional)"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                        <button type="submit" className="form__button">
                            Salvar
                        </button>
                        <button
                            type="reset"
                            className="form__button form__button--cancel"
                            onClick={cancelAndReturn}
                        >
                            Cancelar
                        </button>
                    </form>
                )
            default:
                break
        }
    }

    return <>{setFormContent()}</>
}
