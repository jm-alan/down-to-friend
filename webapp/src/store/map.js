const FOCUS = 'map/FOCUS';

export const Focus = (lng, lat, bounds, zoom) => ({
  type: FOCUS,
  lng,
  lat,
  bounds,
  zoom
});

export default function reducer (
  state = { lat: 0, lng: 0, zoom: 10, bounds: null },
  { type, lat, lng, bounds, zoom }
) {
  switch (type) {
    case FOCUS:
      return { ...state, lat, lng, zoom };
    default:
      return state;
  }
}
