import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleMap from '../Map';
import Slider from '../Slider';
import { GetLocale } from '../../store/user';
import { Focus, LoadMap } from '../../store/map';
import { SetEnumerable, SetLimit } from '../../store/reel';

import './home.css';

export default function Home () {
  const dispatch = useDispatch();
  const list = useSelector(state => state.reel.list);
  const user = useSelector(state => state.session.user);
  const reelLoaded = useSelector(state => state.reel.loaded);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const sessionLoadState = useSelector(state => state.session.loadState);

  useEffect(() => {
    dispatch(SetEnumerable(true));
    if (sessionLoadState === 'cold') {
      if (user) {
        dispatch(GetLocale())
          .then(({ lng, lat }) => {
            dispatch(Focus(lng, lat, null, 8));
          })
          .then(() => {
            dispatch(LoadMap());
          });
      } else {
        dispatch(LoadMap());
        dispatch(Focus(-98.5795, 39.8283, null, 7));
      }
    }
    user && dispatch(SetLimit(user.maxPins));
  }, [dispatch, user, sessionLoadState]);

  return (sessionLoaded || reelLoaded) && (
    <div className='home-container'>
      <Slider />
      <GoogleMap
        list={list}
      />
    </div>
  );
}
