import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
//   if (data.isError){
//     return <p>{data.message}</p>
//   }
  const events = data.events

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: "Could not retrieve events"}
    throw {message: 'Could not fetch events'}
  } else {
    //Response() is a modern browser feature. Its happening in the browser. This is handier than just returning resData because you can return response in your loader
    //const res = new Response()
    return response
  }
}
