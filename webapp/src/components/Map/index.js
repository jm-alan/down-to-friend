import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from 'google-map-react';

import Pin from './Pin';
import { EnumerateReel, UnloadReel, LoadReel, SetEnumerable } from '../../store/reel';
import { Focus } from '../../store/map';

export default function Map ({ list: totalList }) {
  const dispatch = useDispatch();

  const pins = useSelector(state => state.map.pins);
  const enumerable = useSelector(state => state.reel.enumerable);
  const sliderMode = useSelector(state => state.homeSlider.mode);
  const { lat, lng, zoom, loaded, fixed } = useSelector(state => state.map);

  const ratio = totalList && (totalList.length / pins);

  const reducedList = totalList && (pins >= totalList.length
    ? totalList
    : totalList.filter((_item, idx) => !(idx % Math.ceil(ratio))));

  reducedList && (
    (
      reducedList.length < pins && totalList.length >= pins
    ) && (
      (
        (
          reducedList[reducedList.length - 1].id !== totalList[totalList.length - 1].id
        ) && (
          reducedList.push(totalList[totalList.length - 1])
        )
      ) || reducedList.push(totalList[totalList.length - 2])
    )
  );

  const handleMapChange = ({ center, bounds, zoom: changeZoom }) => {
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
        Math.min(bounds.nw.lng, bounds.se.lng),
        Math.max(bounds.nw.lng, bounds.se.lng),
        Math.min(bounds.nw.lat, bounds.se.lat),
        Math.max(bounds.nw.lat, bounds.se.lat)
      ))
        .then(() => {
          dispatch(LoadReel());
        });
    }
    if (
      center.lat !== lat ||
      center.lng !== lng ||
      zoom !== changeZoom
    ) {
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
        >{reducedList && reducedList.map(event => (
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
