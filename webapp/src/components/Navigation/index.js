import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SearchBar from '../SearchBar';

import './Navigation.css';

function Navigation ({ isLoaded }) {
  const { user } = useSelector(state => state.session);
  return isLoaded
    ? (
      <nav className='navbar'>
        <ul>
          <li>
            <NavLink exact to='/'>
              <button className='nav-button home'>
                Home
              </button>
            </NavLink>
          </li>
          {user
            ? (
              <li>
                <ProfileButton />
              </li>
              )
            : (
              <>
                <li>
                  <LoginFormModal />
                </li>
                <li>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </li>
              </>
              )}
        </ul>
        <SearchBar />
      </nav>
      )
    : null;
}

export default Navigation;
