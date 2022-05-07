import axios from "axios"
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

// const API_URL = "https://caio-lemos-my-wallet.herokuapp.com"
const API_URL = "http://localhost:5000"

export default function SignInScreen() {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function handleSubmit(e) {
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
    }

    return (
        <main className="sign-screen container">
            <div className="sign-screen__sign-in sign">
                <form className="sign__form" onSubmit={handleSubmit}>
                    <h1 className="sign__title">My Wallet</h1>
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
                    <button type="submit" className="sign__button">
                        Entrar
                    </button>
                    <Link className="sign__link-to-sign-up" to={"/sign-up"}>
                        Primeira vez? Cadastre-se!
                    </Link>
                </form>
            </div>
        </main>
    )
}
