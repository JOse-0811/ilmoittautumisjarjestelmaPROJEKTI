import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../services/registration';
import { useParams } from 'react-router-dom';
import { Card, TextField, Button, Typography, Box } from '@mui/material';

const EventRegistrationForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { eventId } = useParams();

  const handleRegistration = async event => {
    event.preventDefault();
    setErrorMessage(null);
    console.log(eventId)

    const eventObject = { eventId, name, email, };
    console.log(eventObject)
    try {
      await register.register(eventObject);
      console.log('Submitting registration:', eventObject);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 350, mx: 'auto', my: 10 }}>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 3, width: '25ch' } }}
        onSubmit={handleRegistration}>
        <Typography variant="h5">
          Register for the event
        </Typography>
        <div>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)} required />
        </div>

        <div>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required />
        </div>

        {errorMessage && <p role="alert">{errorMessage}</p>}

        <Button type="submit">Participate</Button>
      </Box>
    </Card>
  );
};

export default EventRegistrationForm;