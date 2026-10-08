import Alert from '@mui/material/Alert'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const notificationText =
    typeof message === 'object' ? message.text : message

  const severity =
    typeof message === 'object' && message.type === 'success'
      ? 'success'
      : 'error'

  return (
    <Alert severity={severity}>
      {notificationText}
    </Alert>
  )
}

export default Notification
