import { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@mui/material'
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
    <>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleCreateEvent}
      >
        <Typography variant='h4' >New event</Typography>
        <TextField required value={name} onChange={({ target }) => setName(target.value)} label="Name" variant="filled" />
        <TextField required value={description} onChange={({ target }) => setDescription(target.value)} label="Description" variant="filled" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker required value={date} onChange={setDate} label="Date and time" />
        </LocalizationProvider>
        <TextField required value={location} onChange={({ target }) => setLocation(target.value)} label="Location" variant="filled" />
        <Button type='submit'><PostAddIcon color="success" />Create</Button>
      </Box>
    </>
  )
}

export default EventCreation