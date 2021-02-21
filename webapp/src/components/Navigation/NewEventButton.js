import { useDispatch, useSelector } from 'react-redux';

import { FixMap, UnfixMap } from '../../store/map';
import { HardSetList, RestoreList } from '../../store/reel';
import { ShowNewEvent, HideNewEvent } from '../../store/newEvent';
import { ShowModal } from '../../store/modal';

let hangingTimeout;

export default function NewEventButton () {
  const dispatch = useDispatch();
  const displayNewEvent = useSelector(state => state.newEvent.display);
  const user = useSelector(state => state.session.user);

  const bufferModeSwitch = () => switchMode();

  const showNewEvent = () => {
    if (!user) return dispatch(ShowModal(bufferModeSwitch));
    else return switchMode();
  };

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
      onClick={showNewEvent}
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
