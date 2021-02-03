import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation ({ isLoaded }) {
  const { user } = useSelector(state => state.session);
  return isLoaded
    ? (
      <ul>
        <li>
          <NavLink exact to='/'>Home</NavLink>
        </li>
        {user
          ? (
            <li>
              <ProfileButton user={user} />
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
      )
    : null;
}

export default Navigation;
