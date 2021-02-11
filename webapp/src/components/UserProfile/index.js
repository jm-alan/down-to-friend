import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileReel from './ProfileReel';
import { EnumerateHosted, EnumerateAttending, LoadProfile, UnloadProfile } from '../../store/profile';

import './profile.css';

export default function UserProfile () {
  const dispatch = useDispatch();
  const { userId: whereAmI } = useParams();
  const {
    user: profileUser,
    hosted,
    attended,
    loadedProfile,
    loadedHosted,
    loadedAttending
  } = useSelector(state => state.profile);
  const loggedInUser = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);

  useEffect(() => {
    dispatch(EnumerateHosted(whereAmI));
    dispatch(EnumerateAttending(whereAmI));
    dispatch(LoadProfile(whereAmI));
    return () => {
      dispatch(UnloadProfile());
    };
  }, [dispatch, whereAmI]);

  return loadedProfile && sessionLoaded
    ? profileUser
        ? (
          <div className='user-profile-container'>
            <ProfileReel
              list={hosted}
              loaded={loadedHosted}
              type='hosted'
              name={loggedInUser.id === profileUser.id
                ? 'you'
                : profileUser.firstName}
            />
            <ProfileReel
              list={attended}
              loaded={loadedAttending}
              type='attended'
              name={loggedInUser.id === profileUser.id
                ? 'you'
                : profileUser.firstName}
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
