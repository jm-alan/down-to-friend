import { useSelector } from 'react-redux';

export default function UpperTitleContainer () {
  const event = useSelector(state => state.eventModal.event);
  return event && (
    <div className='event-title-subcontainer upper'>
      <img src={event.Host.Avatar.url} alt='profilePhoto' />
      <h1>
        {`${
            event.Host.firstName
          } has invited ${
            event.maxGroup
          } people to go ${
            event.title.toTitleCase()
          } on ${
            (new Date(event.dateTime))
              .toLocaleDateString({}, { dateStyle: 'short' })
          }`}
      </h1>
    </div>
  );
}
