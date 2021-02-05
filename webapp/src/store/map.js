const FOCUS = 'map/FOCUS';

const ZOOM = 'map/ZOOM';

export const Focus = (lng, lat, zoom) => ({ type: FOCUS, lng, lat, zoom });

export const UpdateZoom = zoom => ({ type: ZOOM, zoom });

const reducer = (
  state = { lat: 0, lng: 0, zoom: 10 },
  { type, lat, lng, zoom }
) => {
  switch (type) {
    case FOCUS:
      return { ...state, lat, lng, zoom };
    case ZOOM:
      return { ...state, zoom };
    default:
      return state;
  }
};

export default reducer;
