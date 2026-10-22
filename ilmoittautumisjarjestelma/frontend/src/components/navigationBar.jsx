import {
  Link
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material'

const NavigationBar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="h1">
          Event App
        </Typography>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          {/* jos user ei ole kirjautunut niin näkyy login/register, muuten logout */}
          {!user ? (
            <>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Button component={Link} to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Button>

              <Button component={Link} to="/createEvent" style={{ color: 'white', textDecoration: 'none' }}>
                Create event
              </Button>

              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar