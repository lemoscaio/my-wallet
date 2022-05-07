import axios from "axios"
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const API_URL = "https://caio-lemos-my-wallet.herokuapp.com"

export default function SignUpScreen() {
    const navigate = useNavigate()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    function handleSubmit(e) {
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
    }

    return (
        <main className="sign-screen container">
            <div className="sign-screen__sign sign">
                <form className="sign__form" onSubmit={handleSubmit}>
                    <h1 className="sign__title">My Wallet</h1>
                    <input
                        required
                        className="sign__input"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <input
                        required
                        className="sign__input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        required
                        className="sign__input"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <input
                        required
                        className="sign__input"
                        type="password"
                        placeholder="Confirme a senha"
                        value={passwordConfirmation}
                        onChange={(e) => {
                            setPasswordConfirmation(e.target.value)
                        }}
                    />
                    <button type="submit" className="sign__button">
                        Entrar
                    </button>
                    <Link className="sign__link-to-sign-in" to={"/sign-in"}>
                        Primeira vez? Cadastre-se!
                    </Link>
                </form>
            </div>
        </main>
    )
}
