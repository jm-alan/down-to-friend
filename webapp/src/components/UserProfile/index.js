import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ProfileReel from './ProfileReel';
import { EnumerateHosted, EnumerateAttending, LoadProfile } from '../../store/profile';

import './profile.css';

export default function UserProfile () {
  const dispatch = useDispatch();
  const location = useLocation();
  const whereAmI = location.pathname;
  const {
    user,
    hosted,
    attended,
    loadedProfile,
    loadedHosted,
    loadedAttending
  } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(EnumerateHosted(whereAmI));
    dispatch(EnumerateAttending(whereAmI));
    dispatch(LoadProfile(whereAmI));
  }, [dispatch, whereAmI]);
  return loadedProfile
    ? user
        ? (
          <div className='user-profile-container'>
            <ProfileReel
              list={hosted}
              loaded={loadedHosted}
              type='hosted'
              name={user.firstName}
            />
            <ProfileReel
              list={attended}
              loaded={loadedAttending}
              type='attended'
              name={user.firstName}
            />
          </div>
          )
        : (
          <h1>
            Sorry, it seems that user doesn't exist.
          </h1>
          )
    : (
      <h1>
        Loading...
      </h1>
      );
}
