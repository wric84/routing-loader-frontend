import { useParams } from "react-router-dom"

function EventDetail(){
    return (
    <>
    <h1>EventDetail</h1>
    <p>Event ID: {useParams.eventId}</p>
    </>)
}

export default EventDetail