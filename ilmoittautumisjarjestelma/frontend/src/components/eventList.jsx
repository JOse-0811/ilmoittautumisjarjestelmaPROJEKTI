import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '@mui/material';

const EventRow = ({ event }) => {
  const date = new Date(event.date)
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope='event'>
        {event.name}
      </TableCell>
      <TableCell align="right">{event.description}</TableCell>
      <TableCell align="right">{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</TableCell>
      <TableCell align="right">{date.getHours()}.{date.getMinutes()}</TableCell>
      <TableCell align="right">{event.location}</TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"><Button><AssignmentIcon/></Button></TableCell>
    </TableRow>
  )
}

const EventList = ({ events }) => {
  return (
    <>

      <h2>Events</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>nimi</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Osallisujien määrä</TableCell>
            <TableCell align="right">Ilmotaudu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event =>
            <EventRow key={event.id} event={event} />
          )}
        </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default EventList