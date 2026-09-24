import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import eventService from './services/events'
import EventFrom from './components/eventList'
import loginService from './services/login'
import Notification from './components/notifications'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [events, setEvents] = useState([])

    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
      eventService.getAll().then(events =>
        setEvents(events)
      )
        const loggedUserJSON = window.localStorage.getItem('loggedEventappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            eventService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedEventappUser',
                JSON.stringify(user)
            )
            eventService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error.response)
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedEventappUser')
        eventService.setToken(null)
        setUser(null)
    }

    

    return (
        <div>
            <Notification message={errorMessage} />
            {!user && (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            )}
            {user && (
                <div>
                    <p>{user.username} is logged in.</p>
                    <button onClick={handleLogout}>Logout</button>
                    
                    <EventFrom events={events}/>
                </div>
            )}
        </div>
    )

}

export default App