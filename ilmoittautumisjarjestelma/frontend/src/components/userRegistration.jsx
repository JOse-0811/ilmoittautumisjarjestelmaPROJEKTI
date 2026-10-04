import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post('/api/users', {
                name,
                username,
                password
            })

            setMessage('User registered successfully!')
            setName('')
            setUsername('')
            setPassword('')
        } catch (error) {
            setMessage(
                error.response?.data?.error || 'Registration failed'
            )
        }
    }

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label>Username: </label>
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Register
