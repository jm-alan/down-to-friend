import { useDispatch, useSelector } from 'react-redux';

import { FixMap, UnfixMap } from '../../store/map';
import { HardSetList, RestoreList } from '../../store/reel';
import { ShowNewEvent, HideNewEvent } from '../../store/newEvent';

export default function NewEventButton () {
  const dispatch = useDispatch();
  const displayNewEvent = useSelector(state => state.newEvent.display);

  const switchMode = () => {
    switch (displayNewEvent) {
      case false:
        dispatch(HardSetList());
        dispatch(FixMap());
        return dispatch(ShowNewEvent());
      case true:
        dispatch(RestoreList());
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
