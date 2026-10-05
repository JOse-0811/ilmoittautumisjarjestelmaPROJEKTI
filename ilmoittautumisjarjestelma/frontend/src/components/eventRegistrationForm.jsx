const EventRegistrationForm = ({
    name,
    email,
    handleRegistration,
    setName,
    setEmail
}) => {
    return (
        <form onSubmit={handleRegistration}>
            <div>
                <label>
                    name
                    <input 
                    type = "text"
                    value = { name }
                    onChange = { ({target})  => setName(target.value) }
                    />
                </label>
            </div>
            <div>
                <label>
                    email
                    <input
                    type = "email"
                    value = { email }
                    onChange = { ({target}) => setEmail(target.value) }
                    />
                </label>
            </div>
        </form>
    )
}

export default  EventRegistrationForm
