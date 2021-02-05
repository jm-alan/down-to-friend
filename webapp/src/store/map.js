const FOCUS = 'map/FOCUS';

export const Focus = (lng, lat, zoom) => ({ type: FOCUS, lng, lat, zoom });

const reducer = (
  state = { lat: 0, lng: 0, zoom: 10 },
  { type, lat, lng, zoom }
) => {
  switch (type) {
    case FOCUS:
      return { ...state, lat, lng, zoom };
    default:
      return state;
  }
};

export default reducer;
