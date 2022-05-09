import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import {
    BsFillExclamationTriangleFill,
    BsCheckCircleFill,
} from "react-icons/bs"
import CurrencyInput from "react-currency-input-field"
import axios from "axios"

export default function Form(props) {
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

    const [requestError, setRequestError] = useState({})

    const [value, setValue] = useState()
    const [description, setDescription] = useState("")
    const existingDescription = props?.description
    const existingValue = props?.value
    let existingType = props?.type
    const existingId = props?._id

    useEffect(() => {
        if (props) {
            setDescription(existingDescription)
            setValue(existingValue)
        }
    }, [])

    function handleSubmit(e) {
        switch (path) {
            case "/sign-in":
                e.preventDefault()

                const lowerCaseEmailSignIn = email.toLowerCase()

                axios
                    .post(`${process.env.REACT_APP_API_URL}/sign-in`, {
                        email: lowerCaseEmailSignIn,
                        password,
                    })
                    .then((response) => {
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("user", response.data.name)
                        navigate("/")
                    })
                    .catch((error) => {
                        setRequestError(error)
                    })
                break

            case "/sign-up":
                e.preventDefault()

                setTrackingPassword(false)

                const lowerCaseEmailSignUp = email.toLowerCase()

                axios
                    .post(`${process.env.REACT_APP_API_URL}/sign-up`, {
                        name,
                        email: lowerCaseEmailSignUp,
                        password,
                    })
                    .then((response) => {
                        console.log(response)
                        navigate("/sign-in")
                    })
                    .catch((error) => {
                        setRequestError(error)
                    })
                break

            case "/new-entry/deposit":
            case "/new-entry/withdraw":
                e.preventDefault()
                const valueAsNumber = parseFloat(value.replace(",", "."))

                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/statements`,
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
                        navigate("/")
                    })
                    .catch((error) => {
                        console.log(error)

                        setRequestError(error)
                    })
                break
            case "/new-entry/edit":
                e.preventDefault()
                axios
                    .put(
                        `${process.env.REACT_APP_API_URL}/statements/${existingId}`,
                        { description, value, type: existingType },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                    .then((response) => {
                        navigate("/")
                    })
                    .catch((error) => {
                        if(error.response.data?.includes("Data must be different to update")) {
                            navigate("/")
                        }
                        setRequestError(error)
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
            return (
                <p className="additional-message additional-message--password">
                    <BsCheckCircleFill /> As senhas estão iguais
                </p>
            )
        } else if (trackingPassword && !matchingPassword) {
            return (
                <p className="additional-message additional-message--password">
                    <BsFillExclamationTriangleFill /> As senhas não correspondem
                </p>
            )
        } else {
            return <></>
        }
    }

    function setButtonDisabled() {
        return !name || !email || !matchingPassword ? true : false
    }

    function setTypeSelectInput() {
        switch (existingType) {
            case "deposit":
                return (
                    <>
                        <select
                            className="form__input"
                            name="type"
                            id="type"
                            defaultValue="deposit"
                            onChange={(e) => {
                                handleSelectChange(e)
                            }}
                        >
                            <option value="deposit">Entrada (atual)</option>
                            <option value="withdraw">Saída</option>
                        </select>
                    </>
                )
            case "withdraw":
                return (
                    <>
                        <select
                            className="form__input"
                            name="type"
                            id="type"
                            defaultValue="withdraw"
                            onChange={(e) => {
                                handleSelectChange(e)
                            }}
                        >
                            <option value="deposit">Entrada</option>
                            <option value="withdraw">Saída (atual)</option>
                        </select>
                    </>
                )
            default:
                return <></>
        }
    }

    function handleSelectChange(e) {
        existingType = e.target.value
    }

    function setErrorContainerContent(errorPlacement = "before-button") {
        let errorMessage = ""

        switch (requestError.response?.status) {
            case 0:
                errorMessage = "Erro de conexão. Tente novamente."
                break
            case 400:
                switch (requestError.response?.data[0].type) {
                    case "number.min":
                        errorMessage = "O valor deve ser maior que zero!"
                        break
                    case "number.max":
                        errorMessage =
                            "Você não é o Elon Musk para fazer movimentações tão grandes! Bota um valor menor aí, por favor"
                        break
                    default:
                        break
                }
                break
            case 401:
                errorMessage = "E-mail ou senha inválidos."
                break
            case 406:
                errorMessage = `Senha muito fraca. Experimetne adicionar letras
                maiúsculas, números e/ou caracteres especiais.`
                break
            case 409:
                errorMessage = "E-mail já cadastrado!."
                break
            case 500:
                errorMessage = "Algo de errado aconteceu. Tente novamente!"
                break
            default:
                break
        }
        return errorMessage.length > 0 ? (
            <>
                <p
                    className={`additional-message additional-message--${errorPlacement}`}
                >
                    <BsFillExclamationTriangleFill /> {errorMessage}
                </p>
            </>
        ) : (
            <></>
        )
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
                            {setErrorContainerContent()}
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
                        <button
                            disabled={setButtonDisabled()}
                            type="submit"
                            className="form__button"
                        >
                            Cadastrar
                        </button>
                        {setErrorContainerContent("after-button")}
                        <Link className="form__link-to-sign-in" to={"/sign-in"}>
                            Já tem uma conta? Entre agora!
                        </Link>
                    </form>
                )
            case "/new-entry/deposit":
            case "/new-entry/withdraw":
            case "/new-entry/edit":
                return (
                    <form className="sign__form form" onSubmit={handleSubmit}>
                        <CurrencyInput
                            required
                            className="form__input"
                            allowNegativeValue={false}
                            placeholder="Valor (Ex.: 50,00)"
                            step="1"
                            min="10"
                            max="1000000"
                            value={value}
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
                        {setTypeSelectInput()}
                        {setErrorContainerContent()}
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
