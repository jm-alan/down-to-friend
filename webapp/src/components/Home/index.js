import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventReel from './EventReel';
import GoogleMap from '../Map';
import { Focus, LoadMap } from '../../store/map';
import { GetLocale } from '../../store/user';

import './home.css';

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
  const { list, loaded: reelLoaded } = useSelector(state => state.reel);
  const { user, loaded: sessionLoaded } = useSelector(state => state.session);
  const { loaded: mapLoaded } = useSelector(state => state.map);

  useEffect(() => {
    if (sessionLoaded) {
      if (user) {
        dispatch(GetLocale())
          .then(({ lng, lat }) => {
            dispatch(Focus(lng, lat, null, 10));
            dispatch(LoadMap());
          });
      } else {
        window.navigator.geolocation
          .getCurrentPosition(
            geoObj => onLocAccept(geoObj, dispatch),
            () => onLocReject(dispatch));
      }
    }
  }, [sessionLoaded, dispatch, user]);

  return (sessionLoaded || reelLoaded) && (
    <div className='home-container'>
      <EventReel
        list={list}
      />
      {mapLoaded && (
        <GoogleMap
          list={list}
        />
      )}
    </div>
  );
}
