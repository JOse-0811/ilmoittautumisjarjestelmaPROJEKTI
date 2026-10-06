import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material'
import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import eventService from './services/events'
import EventList from './components/eventList'
import loginService from './services/login'
import Notification from './components/notifications'
import EventRegistrationForm from './components/eventRegistrationForm'
import registrationService from './services/registration'
import Register from './components/userRegistration'
import NavigationBar from './components/navigationBar'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [events, setEvents] = useState([])

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEventappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      eventService.setToken(user.token)

      eventService.getAll().then(events => setEvents(events))
    }
  }, [])

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
      const events = await eventService.getAll()
      setEvents(events)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedEventappUser')
    eventService.setToken(null)
    setUser(null)
  }

  const handleRegistration = async event => {
    event.preventDefault()
    // unsure what to continue so this is it for now...
    try {
      const regi = await registrationService.register({ name, email })
    } catch (error) {
      console.log(error.response)
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <Router>
      <NavigationBar user={user} handleLogout={handleLogout}/>

      <Notification message={errorMessage} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
                <Typography variant="h5">
                  {user.username} is logged in.
                </Typography>
                <EventList events={events} />
                <Card sx={{ mt: 4, borderRadius: 3, boxShadow: 2 }}>
                  <CardContent>
                    <EventRegistrationForm
                      name={name}
                      email={email}
                      setName={setName}
                      setEmail={setEmail}
                      handleRegistration={handleRegistration}
                    />
                  </CardContent>
                </Card>
              </Box>
            ) : (
              <Card sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
                <CardContent>
                  <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                  />
                </CardContent>
              </Card>
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
                <Typography variant="h5">
                  {user.username} is logged in.
                </Typography>
                <EventList events={events} />
              </Box>
            ) : (
              <Card sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
                <CardContent>
                  <Register />
                </CardContent>
              </Card>
            )
          }
        />
      </Routes>
    </Router >
  )
}

export default App