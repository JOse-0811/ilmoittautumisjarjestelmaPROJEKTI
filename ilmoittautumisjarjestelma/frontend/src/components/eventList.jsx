const EventFrom = ({events}) => {
return(
<>
<h2>Events</h2>
<div>
{events.map(event =>{ 
  const date= new Date(event.date)

  return <p key={event.id}>{event.name}, {event.description}, {date.getDate()}.{date.getMonth()}.{date.getFullYear()} {date.getHours()}.{date.getMinutes()}, {event.location}</p>})}
</div></>
)}

export default EventFrom