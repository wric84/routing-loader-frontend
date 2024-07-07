import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const {events} = useLoaderData();


  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
  <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents}/>}</Await>
  </Suspense>)
}

export default EventsPage;

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

export function loader() {
  return defer({
    events: loadEvents()
  })
}
