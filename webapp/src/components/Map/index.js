import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from 'google-map-react';

import Pin from './Pin';
import { Focus } from '../../store/map';
import { EnumerateReel, UnloadReel, LoadReel, SetEnumerable } from '../../store/reel';

export default function Map ({ list }) {
  const dispatch = useDispatch();

  const enumerable = useSelector(state => state.reel.enumerable);
  const sliderMode = useSelector(state => state.homeSlider.mode);
  const { lat, lng, zoom, loaded, bounds, fixed } = useSelector(state => state.map);

  const handleMapChange = ({ center, bounds: changeBounds, zoom: changeZoom }) => {
    if (
      sliderMode === 'reel' &&
      enumerable &&
      !fixed
    ) {
      document.querySelectorAll('.map-pin')
        .forEach(pin => pin.classList.remove('focus'));
      dispatch(UnloadReel());
      dispatch(EnumerateReel(
        center.lng,
        center.lat,
        Math.min(changeBounds.nw.lng, changeBounds.se.lng),
        Math.max(changeBounds.nw.lng, changeBounds.se.lng),
        Math.min(changeBounds.nw.lat, changeBounds.se.lat),
        Math.max(changeBounds.nw.lat, changeBounds.se.lat)
      ))
        .then(() => {
          dispatch(LoadReel());
        });
    }
    if (
      center.lat !== lat ||
      center.lng !== lng ||
      zoom !== changeZoom ||
      !Object.deepEq(bounds, changeBounds)
    ) {
      dispatch(Focus(center.lng, center.lat, changeBounds, changeZoom || 10));
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
