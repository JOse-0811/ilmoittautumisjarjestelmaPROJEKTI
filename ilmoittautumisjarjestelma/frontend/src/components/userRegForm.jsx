import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import userService from '../services/users'
import { TextField, Button } from '@mui/material'

const RegisterUser = ({ setErrorMessage, setSuccessMessage }) => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmitUser = async event => {
    event.preventDefault()

    if (name.length < 3) {
      setErrorMessage({
        text: 'Name must be at least 3 characters long',
        type: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    if (username.length < 3) {
      setErrorMessage({
        text: 'Username must be at least 3 characters long',
        type: 'error'
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    if (password.length < 3) {
      setErrorMessage({
        text: 'Password must be at least 3 characters long',
        type: 'error'
      })
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

      setSuccessMessage({
        text: 'User registered successfully!',
        type: 'success'
      })

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setName('')
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      console.log(error.response)

      if (error.response && error.response.data) {
        setErrorMessage({
          text: error.response.data.error || 'Registration failed',
          type: 'error'
        })
      } else {
        setErrorMessage({
          text: 'Registration failed',
          type: 'error'
        })
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
          <TextField
            label="Name:"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <br />
        <div>
          <TextField
            label="Username:"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <br />
        <div>
          <TextField
            label="Password:"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <br />
        <Button type="submit">Register</Button>
      </form>
    </div>
  )
}

export default RegisterUser

