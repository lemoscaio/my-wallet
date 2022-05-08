import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Header from "./Header"
import Statements from "./Statements.js"
import Footer from "./Footer"

// const API_URL = "https://caio-lemos-my-wallet.herokuapp.com"
const API_URL = "http://localhost:5000"

export default function MainScreen() {
    const [statements, setStatements] = useState([])
    const navigate = useNavigate()
    const userName = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token && !userName) {
            navigate("/sign-in")
            return
        }
        axios
            .get(`${API_URL}/statements`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response)

                setStatements([...response.data])
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main className="main-screen container">
            <div className="main-screen__content">
                <Header name={userName}></Header>

                <Statements statements={statements} />

                <Footer></Footer>
            </div>
        </main>
    )
}
