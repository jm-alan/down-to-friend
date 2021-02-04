export default function Pin ({ event }) {
  return (
    <div
      className='map-pin'
    >
      <div>
        {event.title} with {event.User.username}
      </div>
    </div>
  );
}
