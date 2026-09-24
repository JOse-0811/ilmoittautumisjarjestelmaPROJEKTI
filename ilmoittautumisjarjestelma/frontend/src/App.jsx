import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import eventService from './services/events'
import loginService from './services/login'
import Notification from './components/notifications'
import RegistrationForm from './components/registrationForm'
import registrationService from '.services/registration'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
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

    const handleRegistration = async event =>{
        event.preventDefault()
        // unsure what to continue so this is it for now...
        try{
            const regi = await registrationService.register({name,email})
        } catch(error){
            console.log(error.response)
            setErrorMessage('something went wrong')
            setTimeout(()=>{
                setErrorMessage(null)
            }, 5000)
        }

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
                    <h2>Events</h2>

                    <RegistrationForm 
                    name={name}
                    email={email}
                    setName={setName}
                    setEmail={setEmail}
                    handleRegistration={handleRegistration}
                    />
                
                </div>
            )}
        </div>
    )

}

export default App