import { useDispatch, useSelector } from 'react-redux';

import { EnumerateChatPeople } from '../../store/newchat';

export default function EventSelector ({ event, selectEvent }) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.newChat.events);
  const eventsLoaded = useSelector(state => state.newChat.eventsLoaded);

  const onSelectEvent = ({ target: { value } }) => {
    selectEvent(value);
    dispatch(EnumerateChatPeople(value));
  };

  return eventsLoaded
    ? (

      <select
        className='event-selector'
        value={event}
        onChange={onSelectEvent}
        required
      >
        {events.length
          ? [
              (
                !event
                  ? (
                    <option
                      key='vanish'
                      value=''
                    >
                      Pick an event
                    </option>
                    )
                  : null
              ),
              ...events.map((event, idx) => (
                <option key={idx} value={event.id}>
                  {`${event.title.toTitleCase()} with ${event.Host.firstName}`}
                </option>
              ))
            ]
          : (
            <option
              key='dead'
              disabled
              value=''
            >
              You haven't joined any events!
            </option>
            )}
      </select>
      )
    : <img src={`${process.env.PUBLIC_URL}/img/dual-ring-invert.svg`} alt='Loading...' />;
}
