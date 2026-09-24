const EventFrom = ({events}) => {
return(
<>
<h2>Events</h2>
{events.map(event => <p key={event.id}>{event.name}, {event.description}, {event.date}, {event.location}</p>)}
</>
)}

export default EventFrom