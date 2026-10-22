import { useState, useEffect } from 'react'
import eventService from '../services/events'
import LoginForm from '../components/loginForm'
import EventList from '../components/eventList'
import {
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material'

const Home = ({ user, setUser, setErrorMessage, setSuccessMessage }) => {


  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!user) {
      return
    }
    eventService.getAll().then(events => setEvents(events))
  }, [user])

  return (
    user ? (
      <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
        <Typography variant="h5" sx={{ color: '#7bbad3' }}>
          {user.username} is logged in.
        </Typography>
        <EventList events={events} setEvents={setEvents} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
      </Box>
    ) : (
      <Card sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
        <CardContent>
          <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
        </CardContent>
      </Card>
    )
  )
}

export default Home