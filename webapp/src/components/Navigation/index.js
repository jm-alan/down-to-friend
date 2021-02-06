import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import FormModal from '../FormModal';
import SearchBar from '../SearchBar';

import './Navigation.css';

function Navigation ({ isLoaded }) {
  const { user } = useSelector(state => state.session);
  return isLoaded
    ? (
      <nav className='navbar'>
        <div className='user-navigation-buttons'>
          <div className='nav-button-container'>
            <NavLink exact to='/'>
              <button className='nav-button home'>
                Home
              </button>
            </NavLink>
          </div>
          {user
            ? <ProfileButton />
            : <FormModal />}
        </div>
        <SearchBar />
      </nav>
      )
    : null;
}

export default Navigation;
