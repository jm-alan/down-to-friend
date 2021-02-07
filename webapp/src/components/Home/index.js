import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventReel from './EventReel';
import GoogleMap from '../Map';
import { Enumerate } from '../../store/reel';
import { Focus } from '../../store/map';

import './home.css';

const onLocAccept = (geoObj, dispatch) => {
  const { coords: { longitude, latitude } } = geoObj;
  dispatch(Focus(longitude, latitude, null, 10));
};

const onLocReject = dispatch => {
  dispatch(Focus(-121.49428149672518, 38.57366700738277, null, 10));
};

export default function Home () {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.reel);
  const { user, loaded } = useSelector(state => state.session);
  const { locale: { lng, lat } } = useSelector(state => state.user);
  const { lng: mapLng, lat: mapLat } = useSelector(state => state.map);

  useEffect(() => {
    if (loaded) {
      if (user && lng && lat) {
        dispatch(Focus(lng, lat, null, 10));
      } else {
        window.navigator.geolocation
          .getCurrentPosition(
            geoObj => onLocAccept(geoObj, dispatch),
            () => onLocReject(dispatch));
      }
      dispatch(Enumerate(
        mapLng,
        mapLat,
        mapLng - 0.5,
        mapLng + 0.5,
        mapLat - 0.5,
        mapLat + 0.5
      ));
    }
  }, [dispatch, user, lng, lat, loaded, mapLng, mapLat]);

  return loaded && list && (
    <div className='home-container'>
      <EventReel
        list={list}
      />
      <GoogleMap
        loaded={loaded}
        list={list}
      />
    </div>
  );
}
