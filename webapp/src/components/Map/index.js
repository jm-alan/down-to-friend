import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from 'google-map-react';

import Pin from './Pin';
import { EnumerateReel, UnloadReel, LoadReel, SetEnumerable } from '../../store/reel';
import { Focus } from '../../store/map';

export default function Map ({ list }) {
  const dispatch = useDispatch();

  const { lat, lng, zoom, loaded } = useSelector(state => state.map);
  const enumerable = useSelector(state => state.reel.enumerable);

  const handleMapChange = ({ center, bounds, zoom: changeZoom }) => {
    if (enumerable) {
      document.querySelectorAll('.map-pin')
        .forEach(pin => pin.classList.remove('focus'));
      dispatch(UnloadReel());
      dispatch(EnumerateReel(
        center.lng,
        center.lat,
        Math.min(bounds.nw.lng, bounds.se.lng),
        Math.max(bounds.nw.lng, bounds.se.lng),
        Math.min(bounds.nw.lat, bounds.se.lat),
        Math.max(bounds.nw.lat, bounds.se.lat)
      ))
        .then(() => {
          dispatch(LoadReel());
        });
    }
    if (center.lat !== lat ||
      center.lng !== lng ||
      zoom !== changeZoom) {
      dispatch(Focus(center.lng, center.lat, bounds, changeZoom || 10));
    }
    dispatch(SetEnumerable(true));
  };

  return loaded
    ? (
      <div className='map-container'>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY
          }}
          center={{ lng, lat }}
          zoom={zoom}
          onChange={handleMapChange}
        >{list && list.map(event => (
          <Pin
            event={event}
            key={event.id}
            lat={event.latitude}
            lng={event.longitude}
          />
        ))}
        </GoogleMap>
      </div>
      )
    : null;
}
