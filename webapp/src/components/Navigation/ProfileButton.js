import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LogOut } from '../../store/session';
import { SetLocale } from '../../store/user';

import './ProfileButton.css';

function ProfileButton () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { lng, lat } = useSelector(state => state.map);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    dispatch(LogOut());
  };

  const setLocale = () => {
    dispatch(SetLocale({ lng, lat }));
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
            {user.firstName}
          </div>
          <div className='profile-pop-item logout'>
            <button
              className='profile-dropdown-button'
              onClick={logout}
            >
              Log Out
            </button>
          </div>
          <div className='profile-pop-button set-locale'>
            <button
              className='profile-dropdown-button'
              onClick={setLocale}
            >
              Set Default Locale
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
