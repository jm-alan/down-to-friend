import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from 'google-map-react';

import Pin from './Pin';
import { Enumerate, UnloadReel, SetEnumerable } from '../../store/reel';
import { UpdateZoom } from '../../store/map';

export default function Map ({ list }) {
  const dispatch = useDispatch();

  const { lat, lng, zoom } = useSelector(state => state.map);
  const { enumerable } = useSelector(state => state.reel);

  const focalCenter = { lat, lng };

  const handleMapChange = ({ center, bounds, zoom: changeZoom }) => {
    if (enumerable) {
      dispatch(UnloadReel());
      dispatch(Enumerate(
        center.lng,
        center.lat,
        Math.abs(bounds.ne.lng - bounds.sw.lng),
        Math.abs(bounds.ne.lat - bounds.sw.lat)
      ));
    }
    if (zoom !== changeZoom) dispatch(UpdateZoom(changeZoom));
    dispatch(SetEnumerable(true));
  };

  return (
    <div className='map-container'>
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.REACT_APP_API_KEY
        }}
        center={focalCenter}
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
  );
}
