import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import NewEventButton from './NewEventButton';
import FormModal from '../FormModal';
import SearchBar from '../SearchBar';
import EventDetailModal from '../EventDetailModal';
import AboutMe from '../AboutMe';
import { Focus } from '../../store/map';
import { GetLocale } from '../../store/user';

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
          dispatch(Focus(lng, lat, null, 10));
        });
    } else return dispatch(Focus(-121.49428149672518, 38.57366700738277, null, 10));
  };

  return (
    <nav className='navbar'>
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
                  <button>
                    Messages
                  </button>
                </NavLink>
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
