import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import io from 'socket.io-client';

import AboutMe from '../AboutMe';
import FormModal from '../FormModal';
import SearchBar from '../SearchBar';
import ProfileButton from './ProfileButton';
import ProfileEditor from '../ProfileEditor';
import NewEventButton from './NewEventButton';
import EventDetailModal from '../EventDetailModal';
import NotificationBell from '../NotificationBell';
import { Focus } from '../../store/map';
import { GetLocale } from '../../store/user';
import { UnloadReel } from '../../store/reel';
import { SetNotifSocket, GetNotifications } from '../../store/notifManager';

import './Navigation.css';

export default function Navigation () {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.eventModal.event);
  const sessionLoaded = useSelector(state => state.session.loaded);

  const isHome = location.pathname.match(/^\/$/);

  const homeClick = () => {
    if (user) {
      dispatch(GetLocale())
        .then(({ lng, lat }) => {
          dispatch(Focus(lng, lat, null, 8));
        });
    } else return dispatch(Focus(-98.5795, 39.8283, null, 7));
  };

  useEffect(() => {
    if (user) {
      dispatch(GetNotifications());
      const socket = io(undefined, {
        query: {
          type: 'notif'
        }
      });
      dispatch(SetNotifSocket(socket));
      socket.on('chat', () => {
        dispatch(GetNotifications());
      });
      return () => {
        socket.close();
      };
    }
  }, [dispatch, user]);

  return (
    <nav className='navbar'>
      <ProfileEditor />
      {event && <EventDetailModal />}
      {isHome && <NewEventButton />}
      <div className='navigation-container-left'>
        <div className='user-navigation-buttons'>
          <div className='nav-button-container' />
          {sessionLoaded && user
            ? (
              <>
                <ProfileButton />
                <NavLink to='/'>
                  <button
                    className='nav-button home'
                    onClick={homeClick}
                  >
                    Home
                  </button>
                </NavLink>
                <NavLink to='/messages'>
                  <button
                    onClick={() => dispatch(UnloadReel())}
                  >
                    Messages
                  </button>
                </NavLink>
                <NotificationBell />
              </>
              )
            : <FormModal />}
        </div>
        <AboutMe />
      </div>
      {isHome && <SearchBar />}
    </nav>
  );
}
