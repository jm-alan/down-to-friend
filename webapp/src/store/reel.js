import csrfetch from './csrf';

const ENUMERATE = 'list/ENUMERATE';

const enumerate = (list = null) => ({ type: ENUMERATE, list });

export const Enumerate = (longitude, latitude) => async dispatch => {
  const { data } = await csrfetch(`/api/events?longitude=${longitude}&latitude=${latitude}`);
  dispatch(enumerate(data.list));
};

const reducer = (state = { list: null }, { type, list }) => type === ENUMERATE ? ({ ...state, list }) : state;

export default reducer;
