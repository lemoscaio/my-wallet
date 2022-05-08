import React from "react"
import { useParams } from "react-router-dom"
import Form from "./Form"
import Header from "./Header"

export default function NewEntryScreeen() {
    const { entryType } = useParams()

    const type = entryType === "deposit" ? "entrada" : "saída"

    return (
        <main className="new-entry-screen container">
            <Header name={type}></Header>
            <div className="new-entry">
                <Form />
            </div>
        </main>
    )
}
