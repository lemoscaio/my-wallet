import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Header from "./Header"
import Statements from "./Statements.js"
import Footer from "./Footer"

export default function MainScreen() {
    const navigate = useNavigate()
    const userName = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token && !userName) {
            navigate("/sign-in")
            return
        }
    }, [])

    return (
        <main className="main-screen container">
            <div className="main-screen__content">
                <Header name={userName}></Header>

                <Statements />

                <Footer></Footer>
            </div>
        </main>
    )
}
