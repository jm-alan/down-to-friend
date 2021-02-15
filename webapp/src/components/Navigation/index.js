import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import FormModal from '../FormModal';
import SearchBar from '../SearchBar';
import EventDetailModal from '../EventDetailModal';
import NewEventButton from './NewEventButton';

import './Navigation.css';

export default function Navigation () {
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.eventModal.event);
  const sessionLoaded = useSelector(state => state.session.loaded);

  return (
    <nav className='navbar'>
      {event && <EventDetailModal />}
      <NewEventButton />
      <div className='user-navigation-buttons'>
        <div className='nav-button-container'>
          <NavLink to='/'>
            <button className='nav-button home'>
              Home
            </button>
          </NavLink>
        </div>
        {sessionLoaded && user
          ? (
            <>
              <ProfileButton />
              <NavLink to='/messages'>
                <button>
                  Messages
                </button>
              </NavLink>
            </>
            )
          : <FormModal />}
      </div>
      <SearchBar />
    </nav>
  );
}
