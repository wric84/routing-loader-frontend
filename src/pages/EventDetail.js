import { useParams } from "react-router-dom"
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom"
import EventItem from '../components/EventItem'
import EventsList from "../components/EventsList"
import { Suspense } from "react"

function EventDetail(){
    const {event, events} = useRouteLoaderData('event-detail')
    return (
    <>
    <Suspense fallback={<p>Loading...</p>}>
    <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent}/>}
    </Await>
    </Suspense >
    <Suspense fallback={<p>Loading...</p>}>
    <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}/>}
    </Await>
    </Suspense>
    </>)
}

export default EventDetail

async function laodEvent(id){
    const response = await fetch("http://localhost:8080/events" + id);
  
    if (!response.ok) {
      // return {isError: true, message: "Could not retrieve events"}
      // throw new Response(JSON.stringify({message: "Could not fetch events."}), {status: 500})
  
      return json({message: 'Could not find events'}, {status: 500})
    } else {
      //Response() is a modern browser feature. Its happening in the browser. This is handier than just returning resData because you can return response in your loader
      //const res = new Response()
      // return response
      const resData = await response.json()
      return resData.event
    }

}

async function loadEvents(){
    const response = await fetch("http://localhost:8080/events");
  
    if (!response.ok) {
      // return {isError: true, message: "Could not retrieve events"}
      // throw new Response(JSON.stringify({message: "Could not fetch events."}), {status: 500})
  
      return json({message: 'Could not find events'}, {status: 500})
    } else {
      //Response() is a modern browser feature. Its happening in the browser. This is handier than just returning resData because you can return response in your loader
      //const res = new Response()
      // return response
      const resData = await response.json()
      return resData.events
    }
    
  }

export async function loader({request, params}){
    const id = params.eventId
    
    return defer({
        event: await loadEvents(id),
        events: loadEvents()
    })
    
}

export async function action({params, request}){
    const eventId = params.eventId
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method, 
    })

    if (!response.ok){
        throw json({message: 'Could not delete for selected event'}, {status: 500})
            }
            return redirect('/events')
} 