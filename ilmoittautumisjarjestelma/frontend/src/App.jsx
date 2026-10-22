import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route
} from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import eventService from './services/events'
import Notification from './components/notifications'
import Register from './components/userRegForm'
import NavigationBar from './components/navigationBar'
import Home from './pages/home'
import EventCreation from './pages/EventCreation'
import EventRegistrationForm from './components/eventRegistrationForm'


const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#9ac7ae',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#fcc6f0',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#f18c98',
      },
      background: {
        default: '#fdfdfd',
        paper: '#fdfdfd',
      },
      text: {
        primary: '#63a9c5',
        secondary: '#a2cadd',
      },
      divider: '#4d5a74',
    },
    typography: {
      fontFamily: '"Averia Serif Libre", serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 800 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
  });

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css?family=Averia Serif Libre'
    fontLink.rel = 'stylesheet'
    document.head.appendChild(fontLink)

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
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>

      <NavigationBar user={user} handleLogout={handleLogout} />

      <Notification message={successMessage || errorMessage} />

      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} setUser={setUser} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
          }
        />
        <Route
          path="/createEvent"
          element={
            <EventCreation setErrorMessage={setErrorMessage} />
          }
        />
        <Route
          path="/registrations/:eventId"
          element={
            <EventRegistrationForm />
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
                <Typography variant="h5">
                  {user.username} is logged in, welcome!
                </Typography>
              </Box>
            ) : (
              <Card sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
                <CardContent>
                  <Register
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                </CardContent>
              </Card>
            )
          }
        />
      </Routes>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1200,
          textAlign: 'right',
          color: 'text.secondary',
        }}
      >
        <Typography variant="caption" component="h6" sx={{ m: 0, fontSize: '0.75rem' }}>
          Created by: Josette Collin, Emilia Kotkavuori, Deina Slade
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default App