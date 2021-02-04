import { useDispatch } from 'react-redux';

import { Focus } from '../../store/map';

export default function Pin ({ event }) {
  const dispatch = useDispatch();

  const pinClick = id => {
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${id}`).classList.add('focus');
    dispatch(Focus(event.longitude, event.latitude));
  };

  return (
    <div
      className='map-pin'
      id={`map-pin-event-${event.id}`}
      onClick={() => pinClick(event.id)}
    >
      <div>
        {event.title} with {event.User.username}
      </div>
    </div>
  );
}
