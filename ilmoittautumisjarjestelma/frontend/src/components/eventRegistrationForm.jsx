import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../services/registration';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';

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
    <Card sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <form onSubmit={handleRegistration}>
        <div>
          <label> Name
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)} required />
          </label>
        </div>

        <div>
          <label> Email
            <input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required />
          </label>
        </div>

        {errorMessage && <p role="alert">{errorMessage}</p>}

        <button type="submit">Participate</button>
      </form>
    </Card>
  );
};

export default EventRegistrationForm;