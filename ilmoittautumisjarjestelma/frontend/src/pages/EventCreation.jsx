import { useState } from 'react';
import { TextField, Typography, Box, Button } from '@mui/material'
import { green } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PostAddIcon from '@mui/icons-material/PostAdd';
import eventService from '../services/events';
import { useNavigate } from 'react-router-dom'

const EventCreation = ({ setErrorMessage }) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null)
  const [location, setLocation] = useState('')

  const navigate = useNavigate()

  const handleCreateEvent = async event => {
    event.preventDefault()

    try {
      const newEvent = { name, description, date, location }
      await eventService.create(newEvent)

      navigate('/')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
  }

  return (
    <div align="center">
      <br />
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleCreateEvent}
      >
        <Typography variant='h4' sx={{ color: '#7bbad3' }}>New event</Typography>
        <TextField required value={name} onChange={({ target }) => setName(target.value)} label="Name" variant="filled" align="left" /><br />
        <TextField required value={description} onChange={({ target }) => setDescription(target.value)} label="Description" variant="filled" align="left" /><br />
        <TextField required value={location} onChange={({ target }) => setLocation(target.value)} label="Location" variant="filled" align="left" /><br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker required value={date} onChange={setDate} label="Date and time" align="left" /><br />
        </LocalizationProvider>
        <Button type='submit' sx={{ color: '#a5d6a7' }}><PostAddIcon sx={{ color: green[200] }} />Create</Button>
      </Box>
    </div>
  )
}

export default EventCreation