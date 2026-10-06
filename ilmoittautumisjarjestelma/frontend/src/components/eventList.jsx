import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
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
      setSuccessMessage('Event deleted successfully')

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
        'Failed to delete event'
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
      <TableCell align="right">
        {event.participants?.length ?? 0}
      </TableCell>
      <TableCell align="right">
        <Button><AssignmentIcon /></Button>
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
      <h2>Events</h2>
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
