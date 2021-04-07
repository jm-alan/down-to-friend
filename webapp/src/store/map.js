const FOCUS = 'map/FOCUS';

const LOAD = 'map/LOAD';

const UNLOAD = 'map/UNLOAD';

const FIX = 'map/FIX';

const UNFIX = 'map/UNFIX';

export const LoadMap = () => ({ type: LOAD });

export const UnloadMap = () => ({ type: UNLOAD });

export const FixMap = () => ({ type: FIX });

export const UnfixMap = () => ({ type: UNFIX });

export const Focus = (lng, lat, bounds, zoom) => ({
  type: FOCUS,
  lng,
  lat,
  bounds,
  zoom
});

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = {
    lat: 38.57366700738277,
    lng: -121.49428149672518,
    zoom: 10,
    bounds: null,
    loaded: false,
    fixed: false
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
    case FIX:
      return { ...state, fixed: true };
    case UNFIX:
      return { ...state, fixed: false };
    default:
      return state;
  }
}
