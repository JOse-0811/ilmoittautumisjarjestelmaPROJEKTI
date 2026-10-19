import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import eventService from '../services/events'

const EventRow = ({
  event,
  events,
  setEvents,
  setSuccessMessage,
  setErrorMessage
}) => {
  const date = new Date(event.date)

  const handleDelete = async () => {
    if (!window.confirm(`Delete event "${event.name}"?`)) {
      return
    }

    try {
      await eventService.remove(event.id)
      setEvents(events.filter(e => e.id !== event.id))
      setSuccessMessage({
        text: 'Event deleted successfully',
        type: 'success'
      })

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Delete failed:', error)
      console.error('Response:', error.response?.data)
      console.error('Status:', error.response?.status)

      setErrorMessage(
        error.response?.data?.error ||
        error.message ||
        {
          text: 'Failed to delete event',
          type: 'error'
        }
      )

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {event.name}
      </TableCell>
      <TableCell align="right">{event.description}</TableCell>
      <TableCell align="right">
        {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
      </TableCell>
      <TableCell align="right">
        {date.getHours()}.{String(date.getMinutes()).padStart(2, '0')}
      </TableCell>
      <TableCell align="right">{event.location}</TableCell>
      <TableCell align="right"><PersonIcon />{event.registrationCount}</TableCell>
      <TableCell align="right">
        <Button component={Link} to={`/registrations/${event.id}`}><AssignmentIcon /></Button>
      </TableCell>
      <TableCell align="right">
        <Button onClick={handleDelete} color="error">
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

const EventList = ({
  events,
  setEvents,
  setSuccessMessage,
  setErrorMessage
}) => {
  return (
    <>
      <br />
      <Typography variant="h4" sx={{ color: '#7bbad3' }}>Events</Typography><br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Amount of participants</TableCell>
              <TableCell align="right">Sign up</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <EventRow
                key={event.id}
                event={event}
                events={events}
                setEvents={setEvents}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default EventList
