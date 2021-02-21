import { useDispatch, useSelector } from 'react-redux';

import { FixMap, UnfixMap } from '../../store/map';
import { HardSetList, RestoreList } from '../../store/reel';
import { ShowNewEvent, HideNewEvent } from '../../store/newEvent';

let hangingTimeout;

export default function NewEventButton () {
  const dispatch = useDispatch();
  const displayNewEvent = useSelector(state => state.newEvent.display);

  const switchMode = () => {
    switch (displayNewEvent) {
      case false:
        hangingTimeout && clearTimeout(hangingTimeout);
        hangingTimeout = setTimeout(() => {
          dispatch(HardSetList());
          hangingTimeout = undefined;
        }, 500);
        dispatch(FixMap());
        return dispatch(ShowNewEvent());
      case true:
        ((hangingTimeout || dispatch(RestoreList())) && clearTimeout(hangingTimeout)) ?? (hangingTimeout = undefined);
        dispatch(UnfixMap());
        return dispatch(HideNewEvent());
      default:
        dispatch(RestoreList());
        dispatch(UnfixMap());
        return dispatch(HideNewEvent());
    }
  };

  return (
    <button
      className='new-event-button'
      onClick={switchMode}
    >
      {!displayNewEvent
        ? (
          <>
            <i className='fas fa-plus' />
            <span className='new-event-button-text'>
              New
            </span>
          </>
          )
        : (
          <>
            <i className='fas fa-times' />
            <span className='new-event-button-text'>
              Cancel
            </span>
          </>
          )}
    </button>
  );
}
