import csrfetch from './csrf';

const enumerate = (list = null) => ({ type: 'list/ENUMERATE', list });

export const Enumerate = (longitude, latitude) => async dispatch => {
  const { data } = await csrfetch(`/api/events?longitude=${longitude}&latitude=${latitude}`);
  dispatch(enumerate(data.list));
};

const reducer = (_state, { list }) => ({ list });

export default reducer;
