import { useState } from 'react'
import eventService from '../services/events'
import loginService from '../services/login'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ setUser, setErrorMessage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedEventappUser',
        JSON.stringify(user)
      )
      eventService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response)
      setErrorMessage({
        text: 'wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div><br />
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div><br />
      <Button type="submit">Login</Button>
    </form >
  )
}

export default LoginForm