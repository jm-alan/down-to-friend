import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../FormModal/LoginForm';
import { FixMap, UnfixMap } from '../../store/map';
import { HardSetList, RestoreList } from '../../store/reel';
import { ShowModal, SetCurrent, SetAfter } from '../../store/modal';
import { ShowReel, ShowNew, ShowLast } from '../../store/homeSlider';

let hangingTimeout;

export default function NewEventButton () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const sliderMode = useSelector(state => state.homeSlider.mode);

  const bufferModeSwitch = () => switchMode();

  const showNewEvent = () => {
    if (!user) {
      dispatch(SetCurrent(LoginForm));
      dispatch(ShowModal());
      dispatch(SetAfter(bufferModeSwitch));
    } else switchMode();
  };

  const switchMode = () => {
    switch (sliderMode) {
      case 'reel':
        hangingTimeout && clearTimeout(hangingTimeout);
        hangingTimeout = setTimeout(() => {
          dispatch(HardSetList());
          hangingTimeout = undefined;
        }, 660);
        dispatch(FixMap());
        return dispatch(ShowNew());
      case 'settings':
        hangingTimeout && clearTimeout(hangingTimeout);
        hangingTimeout = setTimeout(() => {
          dispatch(HardSetList());
          hangingTimeout = undefined;
        }, 660);
        dispatch(FixMap());
        return dispatch(ShowNew());
      case 'new':
        (
          (hangingTimeout || dispatch(RestoreList())) && clearTimeout(hangingTimeout)
        ) ?? (hangingTimeout = undefined);
        dispatch(UnfixMap());
        return dispatch(ShowLast());
      default:
        dispatch(RestoreList());
        dispatch(UnfixMap());
        return dispatch(ShowReel());
    }
  };

  return (
    <button
      className='new-event-button'
      onClick={showNewEvent}
    >
      {sliderMode !== 'new'
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
