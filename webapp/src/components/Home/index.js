import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventReel from './EventReel';
import GoogleMap from '../Map';
import { Focus, LoadMap, UnloadMap } from '../../store/map';
import { GetLocale } from '../../store/user';

import './home.css';
import { UnloadReel, SetEnumerable } from '../../store/reel';

const onLocAccept = (geoObj, dispatch) => {
  const { coords: { longitude, latitude } } = geoObj;
  dispatch(Focus(longitude, latitude, null, 10));
  dispatch(LoadMap());
};

const onLocReject = dispatch => {
  dispatch(Focus(-121.49428149672518, 38.57366700738277, null, 10));
  dispatch(LoadMap());
};

export default function Home () {
  const dispatch = useDispatch();
  const reelLoaded = useSelector(state => state.reel.loaded);
  const list = useSelector(state => state.reel.list);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(SetEnumerable(true));
    if (sessionLoaded) {
      if (user) {
        dispatch(GetLocale())
          .then(({ lng, lat }) => {
            dispatch(Focus(lng, lat, null, 10));
          })
          .then(() => {
            dispatch(LoadMap());
          });
      } else {
        window.navigator.geolocation
          .getCurrentPosition(
            geoObj => onLocAccept(geoObj, dispatch),
            () => onLocReject(dispatch));
      }
    }
    return () => {
      dispatch(UnloadReel());
      dispatch(UnloadMap());
    };
  }, [sessionLoaded, dispatch, user]);

  return (sessionLoaded || reelLoaded) && (
    <div className='home-container'>
      <EventReel
        list={list}
      />
      <GoogleMap
        list={list}
      />
    </div>
  );
}
