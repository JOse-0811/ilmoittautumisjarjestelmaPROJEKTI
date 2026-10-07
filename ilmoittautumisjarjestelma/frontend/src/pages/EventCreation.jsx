import { TextField, Typography, Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd';
const EventCreation = ({ }) => {
  return (
    <>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <Typography variant='h4' >New event</Typography>
        <TextField label="Name" variant="filled" />
        <TextField label="Description" variant="filled" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Date and time" />
        </LocalizationProvider>
       <TextField label="Location" variant="filled" />
        <Button><PostAddIcon color="success" /></Button>
      </Box>
    </>
  )
}

export default EventCreation