import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationContainer from './NotificationContainer';
import { ShowNotifs, HideNotifs } from '../../store/notifManager';

export default function NotificationBell () {
  const dispatch = useDispatch();
  const showNotifs = useSelector(state => state.notifManager.display);

  const bellRef = useRef(null);

  useEffect(() => {
    const closeNotifs = () => dispatch(HideNotifs());
    showNotifs && document.addEventListener('click', closeNotifs);
    return () => document.removeEventListener('click', closeNotifs);
  });

  return (
    <>
      <button
        onClick={() => !showNotifs && dispatch(ShowNotifs())}
        ref={bellRef}
      >
        <i className='fas fa-bell' />
      </button>
      <NotificationContainer bellRef={bellRef} />
    </>
  );
}
