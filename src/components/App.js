import { BrowserRouter, Routes, Route } from "react-router-dom"

import React from "react"
import MainScreen from "./MainScreen.js"
import SignInScreen from "./SignInScreen.js"
import SignUpScreen from "./SignUpScreen.js"
import NewEntryScreen from "./NewEntryScreeen.js"

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainScreen />}></Route>
                    <Route path="/sign-in" element={<SignInScreen />}></Route>
                    <Route path="/sign-up" element={<SignUpScreen />}></Route>
                    <Route
                        path="/new-entry/:entryType"
                        element={<NewEntryScreen />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
