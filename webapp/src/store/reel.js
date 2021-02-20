import csrfetch from './csrf';

const ENUMERATE = 'reel/ENUMERATE';

const RESTORE = 'reel/RESTORE';

const MODE = 'reel/MODE';

const LOAD = 'reel/LOAD';

const UNLOAD = 'reel/UNLOAD';

const REF = 'reel/REF';

const enumerate = list => ({ type: ENUMERATE, list });

export const HardSetList = pin => ({ type: ENUMERATE, list: pin ?? [] });

export const RestoreList = () => ({ type: RESTORE });

export const SetEnumerable = enumerable => ({ type: MODE, enumerable });

export const LoadReel = () => ({ type: LOAD });

export const UnloadReel = () => ({ type: UNLOAD });

export const SetRef = ref => ({ type: REF, ref });

export const EnumerateReel = (
  centerLng, centerLat, lowerLng,
  upperLng, lowerLat, upperLat
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

const reducer = (state = {
  list: null,
  loaded: false,
  searchCenter: { lat: 0, lng: 0 },
  enumerable: true,
  ref: null,
  store: []
}, { type, list, enumerable, ref }) => {
  switch (type) {
    case ENUMERATE:
      return {
        ...state,
        store: state.list ?? [],
        list
      };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    case MODE:
      return { ...state, enumerable };
    case RESTORE:
      return {
        ...state,
        store: [],
        list: [...state.store]
      };
    case REF:
      return { ...state, ref };
    default:
      return state;
  }
};

export default reducer;
