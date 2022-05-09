import React from "react"
import { useParams, useLocation } from "react-router-dom"
import Form from "./Form"
import Header from "./Header"

export default function NewEntryScreeen() {
    const { entryType } = useParams()

    const location = useLocation()
    const description = location.state?.description
    const value = location.state?.value
    const existingType = location.state?.type
    const _id = location.state?._id

    const type = entryType === "deposit" ? "entrada" : "saída"

    return (
        <main className="new-entry-screen container">
            <Header name={type}></Header>
            <div className="new-entry">
                <Form
                    description={description}
                    value={value}
                    _id={_id}
                    type={existingType}
                />
            </div>
        </main>
    )
}
