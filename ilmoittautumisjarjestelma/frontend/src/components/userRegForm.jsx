import { useState } from 'react'
import userService from '../services/users'

const RegisterUser = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleSubmitUser = async event => {
        event.preventDefault()

        if (name.length < 3) {
            setErrorMessage('Name must be at least 3 characters long')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        if (username.length < 3) {
            setErrorMessage('Username must be at least 3 characters long')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        if (password.length < 3) {
            setErrorMessage('Password must be at least 3 characters long')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        try {
            await userService.register({
                name,
                username,
                password
            })

            setSuccessMessage('User registered successfully!')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            setName('')
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error || 'Registration failed')
            } else {
                setErrorMessage('Registration failed')
            }
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Register as a user</h2>
            <form onSubmit={handleSubmitUser}>
                <div>
                    <label>Name: </label>
                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}

export default RegisterUser