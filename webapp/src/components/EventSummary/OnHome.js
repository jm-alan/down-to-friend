import { useDispatch } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';

import { SetEnumerable, UnloadReel } from '../../store/reel';
import { Focus, UnloadMap } from '../../store/map';
import SummaryBody from './SummaryBody';

export default function OnHome ({ event }) {
  const dispatch = useDispatch();

  const clickHandle = () => {
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${event.id}`)
      .classList.add('focus');
    dispatch(SetEnumerable(false));
    dispatch(Focus(event.longitude, event.latitude, null, 12));
  };

  const profileClick = () => {
    dispatch(UnloadMap());
    dispatch(UnloadReel());
  };

  return (
    <NavHashLink
      to={`#event-summary-${event.id}`}
      smooth
    >
      <div
        id={`event-summary-${event.id}`}
        className='event-summary-container'
        onClick={clickHandle}
      >
        <SummaryBody
          event={event}
          profileClick={profileClick}
        />
      </div>
    </NavHashLink>
  );
}
