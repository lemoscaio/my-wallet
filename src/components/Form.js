import React, { useState } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import InputMask from "react-input-mask"
import CurrencyInput from "react-currency-input-field"
import axios from "axios"

// const API_URL = "https://caio-lemos-my-wallet.herokuapp.com"
const API_URL = "http://192.168.1.178:5000"

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
    const [trackingPassword, setTrackingPassword] = useState(false)
    const [matchingPassword, setMatchingPassword] = useState(false)

    const [value, setValue] = useState()
    const [description, setDescription] = useState("")

    function handleSubmit(e) {
        switch (path) {
            case "/sign-in":
                e.preventDefault()

                const lowerCaseEmailSignIn = email.toLowerCase()

                axios
                    .post(`${API_URL}/sign-in`, {
                        email: lowerCaseEmailSignIn,
                        password,
                    })
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

                const lowerCaseEmailSignUp = email.toLowerCase()

                axios
                    .post(`${API_URL}/sign-up`, {
                        name,
                        email: lowerCaseEmailSignUp,
                        password,
                    })
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
                const valueAsNumber = parseFloat(value.replace(",", "."))

                axios
                    .post(
                        `${API_URL}/statements`,
                        {
                            value: valueAsNumber,
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

    function startTrackingPassword(e) {
        if (e.target.name === "password") {
            setPassword(e.target.value)
            if (e.target.value === passwordConfirmation)
                setMatchingPassword(true)
            else setMatchingPassword(false)
        }
        if (e.target.name === "password-confirmation") {
            setPasswordConfirmation(e.target.value)
            e.target.value.length > 0
                ? setTrackingPassword(true)
                : setTrackingPassword(false)
            if (e.target.value === password) setMatchingPassword(true)
            else setMatchingPassword(false)
        }
    }

    function cancelAndReturn() {
        setValue("")
        setDescription("")
        navigate(-1)
        return
    }

    function isPasswordMatching() {
        if (trackingPassword && matchingPassword) {
            return <p>As senhas estão iguais</p>
        } else if (trackingPassword && !matchingPassword) {
            return <p>As senhas não correspondem</p>
        } else {
            return <></>
        }
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
                            pattern="^[a-zA-ZãÃÇ-Üá-ú ]*$"
                            title="A menos que você seja o filho do Elon Musk, o campo de nome deve conter apenas letras."
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
                            name="password"
                            className="form__input"
                            type="password"
                            placeholder="Senha"
                            pattern="^\S{6,20}$"
                            title="Sua senha precisa ter de 6 a 20 caracteres e pode conter letras minúsculas, maiúculas, números e caracteres especiais"
                            value={password}
                            onChange={(e) => {
                                startTrackingPassword(e)
                            }}
                        />
                        <input
                            required
                            name="password-confirmation"
                            className="form__input"
                            type="password"
                            placeholder="Confirme a senha"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                startTrackingPassword(e)
                            }}
                        />
                        {isPasswordMatching()}

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
                            onValueChange={(newValue) => setValue(newValue)}
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
