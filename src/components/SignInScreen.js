import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Form from "./Form"

export default function SignInScreen() {
    const navigate = useNavigate()
    const userName = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token && userName) {
            navigate("/")
            return
        }
    }, [])

    return (
        <main className="sign-screen container">
            <div className="sign-screen__sign-in sign">
                <h1 className="sign__title">My Wallet</h1>
                <Form></Form>
            </div>
        </main>
    )
}
