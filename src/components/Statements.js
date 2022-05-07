import React from "react"

export default function Statements(props) {
    const { statements } = props

    function calcBalance() {
        let balance = statements.reduce((accumulator, { value, type }) => {
            return type === "deposit"
                ? accumulator + value
                : accumulator - value
        }, 0)

        return balance
    }

    return (
        <article className="main-screen__statements statements">
            <ul className="statements__list">
                {statements?.length > 0 ? (
                    statements.map(({ description, type, value }) => {
                        return (
                            <li className="statements__item">
                                <h1 className="statements__date">10/04</h1>
                                <h1 className="statements__description">
                                    {description}
                                </h1>
                                <h1
                                    className={`statements__value ${
                                        type === "deposit"
                                            ? "positive-number"
                                            : "negative-number"
                                    }`}
                                >
                                    {value}
                                </h1>
                            </li>
                        )
                    })
                ) : (
                    <p className="statements__empty">
                        Não há registros de entrada ou saída
                    </p>
                )}
            </ul>
            <div className="statements__balance-container">
                <p className="statements__balance-label">Saldo</p>
                <p
                    className={`statements__balance-value ${
                        calcBalance() > 0
                            ? "positive-number"
                            : "negative-number"
                    }`}
                >
                    {calcBalance()}
                </p>
            </div>
        </article>
    )
}
