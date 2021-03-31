import csrfetch from './csrf';

const ENUMERATE = 'reel/ENUMERATE';

const HARDSET = 'reel/HARDSET';

const RESTORE = 'reel/RESTORE';

const MODE = 'reel/MODE';

const LOAD = 'reel/LOAD';

const UNLOAD = 'reel/UNLOAD';

const REF = 'reel/REF';

const POP = 'reel/POP';

const UNPOP = 'reel/UNPOP';

const LIMIT = 'reel/LIMIT';

const enumerate = list => ({ type: ENUMERATE, list });

export const HardSetList = pin => ({ type: HARDSET, list: pin ?? [] });

export const RestoreList = () => ({ type: RESTORE });

export const SetEnumerable = enumerable => ({ type: MODE, enumerable });

export const LoadReel = () => ({ type: LOAD });

export const UnloadReel = () => ({ type: UNLOAD });

export const SetRef = ref => ({ type: REF, ref });

export const Pop = poppedEvent => ({ type: POP, poppedEvent });

export const UnPop = () => ({ type: UNPOP });

export const SetLimit = limit => ({ type: LIMIT, limit });

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
  // eslint-disable-next-line
  state = {
    list: null,
    loaded: false,
    searchCenter: { lat: 0, lng: 0 },
    enumerable: true,
    ref: null,
    poppedEvent: null,
    store: [],
    limit: 25
  }, { type, list, enumerable, ref, poppedEvent, limit }) {
  list = list || state.list;
  limit = limit || state.limit;
  const ratio = list && (list.length / limit);

  const reducedList = list && (limit >= list.length
    ? list
    : list.filter((_item, idx) => !(idx % Math.ceil(ratio))));

  reducedList && (
    (
      reducedList.length < limit && list.length >= limit
    ) && (
      (
        (
          reducedList[reducedList.length - 1].id !== list[list.length - 1].id
        ) && (
          reducedList.push(list[list.length - 1])
        )
      ) || reducedList.push(list[list.length - 2])
    )
  );
  list = reducedList;
  switch (type) {
    case ENUMERATE:
      return { ...state, list };
    case HARDSET:
      return { ...state, store: (!state.store.length && state.list) || state.store, list };
    case LIMIT:
      return { ...state, limit };
    case POP:
      return { ...state, poppedEvent };
    case UNPOP:
      return { ...state, poppedEvent: null };
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
