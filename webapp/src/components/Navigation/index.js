import { useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import NewEventButton from './NewEventButton';
import FormModal from '../FormModal';
import SearchBar from '../SearchBar';
import EventDetailModal from '../EventDetailModal';
import AboutMe from '../AboutMe';

import './Navigation.css';

export default function Navigation () {
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.eventModal.event);
  const sessionLoaded = useSelector(state => state.session.loaded);

  const isHome = location.pathname.match(/^\/$/);

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
                  <button className='nav-button home'>
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
