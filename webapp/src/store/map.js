const FOCUS = 'map/FOCUS';

const UNLOAD = 'map/UNLOAD';

const LOAD = 'map/LOAD';

export const LoadMap = () => ({ type: LOAD });

export const UnloadMap = () => ({ type: UNLOAD });

export const Focus = (lng, lat, bounds, zoom) => ({
  type: FOCUS,
  lng,
  lat,
  bounds,
  zoom
});

export default function reducer (
  state = {
    lat: 38.57366700738277,
    lng: -121.49428149672518,
    zoom: 10,
    bounds: null,
    loaded: false
  },
  { type, lat, lng, bounds, zoom }
) {
  switch (type) {
    case FOCUS:
      return { ...state, lat, lng, zoom, bounds };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    default:
      return state;
  }
}
