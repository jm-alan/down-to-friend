import csrfetch from './csrf';

const ENUMERATE = 'reel/ENUMERATE';

const MODE = 'reel/MODE';

const LOAD = 'reel/LOAD';

const UNLOAD = 'reel/UNLOAD';

const enumerate = (list) => ({ type: ENUMERATE, list });

export const EnumerateReel = (
  centerLng,
  centerLat,
  lowerLng,
  upperLng,
  lowerLat,
  upperLat
) => async dispatch => {
  const { data } = await csrfetch(
    `/api/events?centerLng=${
      centerLng
    }&centerLat=${
      centerLat
    }&lowerLng=${
      lowerLng
    }&upperLng=${
      upperLng
    }&lowerLat=${
      lowerLat
    }&upperLat=${
      upperLat
    }`
  );
  dispatch(enumerate(data.list));
};

export const SetEnumerable = enumerable => ({ type: MODE, enumerable });

export const LoadReel = () => ({ type: LOAD });

export const UnloadReel = () => ({ type: UNLOAD });

const reducer = (state = {
  list: null,
  loaded: false,
  searchCenter: { lat: 0, lng: 0 },
  enumerable: true
}, { type, list, enumerable }) => {
  switch (type) {
    case ENUMERATE:
      return { ...state, list };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    case MODE:
      return { ...state, enumerable };
    default:
      return state;
  }
};

export default reducer;
