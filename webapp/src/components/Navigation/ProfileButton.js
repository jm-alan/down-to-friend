import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { LogOut } from '../../store/session';
import { ShowSettings } from '../../store/homeSlider';
import { ShowProfileEditor } from '../../store/profileEditor';

import './ProfileButton.css';

export default function ProfileButton () {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const isHome = location.pathname.match(/^\/$/);

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    dispatch(LogOut());
  };

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div
      className='nav-button-container'
    >
      <button onClick={openMenu}>
        <i className='fas fa-user-circle' />
      </button>
      {showMenu && user && (
        <div
          id='profile-button-container'
          className='profile-dropdown'
        >
          <div className='profile-pop-item name'>
            <Link to='/users/me'>
              <button
                className='profile-dropdown-button'
              >
                {user.firstName}
              </button>
            </Link>
          </div>
          {isHome && (
            <div className='profile-pop-item search-preferences'>
              <button
                className='profile-dropdown-button'
                onClick={() => dispatch(ShowSettings())}
              >
                Search Preferences
              </button>
            </div>
          )}
          <div className='profile-pop-item edit-profile'>
            <button
              className='profile-dropdown-button'
              onClick={() => dispatch(ShowProfileEditor())}
            >
              Edit Profile
            </button>
          </div>
          <div className='profile-pop-item logout last'>
            <button
              className='profile-dropdown-button'
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
