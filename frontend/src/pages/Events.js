import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';
import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();
  console.log("events", events);
  // const events = data.events;
  //  console.log(events);

  // return <EventsList events={events} />
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage;

// export async function loader() {
//   const response = await fetch('http://localhost:8080/events');
//   if (!response.ok) {
//     // ...
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }),{status:500});
//     return json({ message: 'Could not fetch events.' }, { status: 500 });
//   } else {
//     const resData = await response.json();
//     // return resData.events; có thể thay thế ở dưới
//     const res = new Response('any data', { status: 201 });
//     return res;
//     // return response;
//   }
// }

async function loadedEvents() {
  try {
    const response = await fetch('http://localhost:8080/events');
    console.log("RESSSS", response);
    if (!response.ok) {

      throw json(
        { message: 'Could not fetch events.' }
        , { status: 500 });
    } else {
      const resData = await response.json();
      return resData.events;
    }
  }
  catch (error) {
    console.log("ERRRORRRRR", error)
  }
}

export function loader() {
  defer({
    events: loadedEvents()
  })
}
