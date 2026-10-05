const EventForm = ({events}) => {
return(
<>
<h2>Events</h2>
<div>
{events.map(event => <p key={event.id}>{event.name}, {event.description}, {event.date}, {event.location}</p>)}
</div></>
)}

export default EventForm