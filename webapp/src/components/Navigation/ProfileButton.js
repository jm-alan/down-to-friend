import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LogOut } from '../../store/session';

import './ProfileButton.css';

function ProfileButton () {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.session);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(LogOut());
  };

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div className='nav-button-container'>
      <button onClick={openMenu}>
        <i className='fas fa-user-circle' />
      </button>
      {showMenu && user && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
