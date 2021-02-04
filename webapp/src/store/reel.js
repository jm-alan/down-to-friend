import csrfetch from './csrf';

const ENUMERATE = 'reel/ENUMERATE';

const MODE = 'reel/MODE';

const LOAD = 'reel/LOAD';

const UNLOAD = 'reel/UNLOAD';

const enumerate = (list, searchCenter) => ({ type: ENUMERATE, list, searchCenter });

export const Enumerate = (lng, lat, lngDiff, latDiff) => async dispatch => {
  const { data } = await csrfetch(`/api/events?longitude=${lng}&latitude=${lat}&lngDiff=${lngDiff}&latDiff=${latDiff}`);
  dispatch(enumerate(data.list, { lng, lat }));
  dispatch(LoadReel());
};

export const SetEnumerable = enumerable => ({ type: MODE, enumerable });

export const LoadReel = () => ({ type: LOAD });

export const UnloadReel = () => ({ type: UNLOAD });

const reducer = (state = {
  list: null,
  loaded: false,
  searchCenter: { lat: 0, lng: 0 },
  enumerable: true
}, { type, list, searchCenter, enumerable }) => {
  switch (type) {
    case ENUMERATE:
      return { ...state, list, searchCenter };
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
