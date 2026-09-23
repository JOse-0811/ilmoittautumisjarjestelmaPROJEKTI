import styled from 'styled-components'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    if (!message) {
        return null
    }
    const NotificationStyle =
        message.type === 'success' ? SuccessNotification : ErrorNotification
    const notificationText =
        typeof message === 'object' ? message.text : message
    return <NotificationStyle>{notificationText}</NotificationStyle>
}

const ErrorNotification = styled.div`
 color: red;
 background: lightgrey;
 font-size: 20px;
 border-style: solid;
 border-radius: 5px;
 padding: 10px;
 margin-bottom: 10px;
`

const SuccessNotification = styled.div`
 color: green;
 background: lightgrey;
 font-size: 20px;
 border-style: solid;
 border-radius: 5px;
 padding: 10px;
 margin-bottom: 10px;
`

export default Notification