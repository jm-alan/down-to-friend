import csrfetch from './csrf';

const ENUMERATE = 'reel/ENUMERATE';

const HARDSET = 'reel/HARDSET';

const RESTORE = 'reel/RESTORE';

const MODE = 'reel/MODE';

const LOAD = 'reel/LOAD';

const UNLOAD = 'reel/UNLOAD';

const REF = 'reel/REF';

const enumerate = list => ({ type: ENUMERATE, list });

export const HardSetList = pin => ({ type: HARDSET, list: pin ?? [] });

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

export default function reducer (
  state = {
    list: null,
    loaded: false,
    searchCenter: { lat: 0, lng: 0 },
    enumerable: true,
    ref: null,
    store: []
  }, { type, list, enumerable, ref }) {
  switch (type) {
    case ENUMERATE:
      return { ...state, list };
    case HARDSET:
      return { ...state, store: (!state.store.length && state.list) || state.store, list };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    case MODE:
      return { ...state, enumerable };
    case RESTORE:
      return { ...state, store: [], list: [...state.store] };
    case REF:
      return { ...state, ref };
    default:
      return state;
  }
}
