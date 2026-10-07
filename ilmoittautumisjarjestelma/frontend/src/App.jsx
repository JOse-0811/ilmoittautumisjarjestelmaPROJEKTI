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
import eventService from './services/events'
import Notification from './components/notifications'
import Register from './components/userRegForm'
import NavigationBar from './components/navigationBar'
import Home from './pages/home'

const App = () => {

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedEventappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      eventService.setToken(user.token)
    }
  }, [])



  const handleLogout = () => {
    window.localStorage.removeItem('loggedEventappUser')
    eventService.setToken(null)
    setUser(null)
  }

  return (
    <Router>
      <NavigationBar user={user} handleLogout={handleLogout} />

      <Notification message={errorMessage} />
      <Notification message={successMessage} />
      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
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