import csrfetch from './csrf';

const SHOWNEWCHAT = 'newchat/SHOW';

const HIDENEWCHAT = 'newchat/HIDE';

const EVENTS = 'newchat/EVENTS';

const ATTENDING = 'newchat/ATTENDING';

const enumerateEvents = events => ({ type: EVENTS, events });

const enumeratePeople = people => ({ type: ATTENDING, people });

export const ShowNewChat = () => ({ type: SHOWNEWCHAT });

export const HideNewChat = () => ({ type: HIDENEWCHAT });

export const CreateChat = userId => async () => {
  const { data } = await csrfetch('/api/conversations', {
    method: 'POST',
    body: JSON.stringify({ userId })
  });
  return data.convo;
};

export const EnumerateChatEvents = () => async dispatch => {
  const { data } = await csrfetch('/api/users/me/events/attending');
  dispatch(enumerateEvents(data.events));
};

export const EnumerateChatPeople = eventId => async dispatch => {
  const { data } = await csrfetch(`/api/users/me/events/attending/${eventId}/attendees`);
  dispatch(enumeratePeople(data.people));
};

export default function reducer (
  state = { newChat: false, events: [], people: [] },
  { type, events, people }
) {
  switch (type) {
    case SHOWNEWCHAT:
      return { ...state, display: true };
    case HIDENEWCHAT:
      return {
        ...state,
        events: [],
        people: [],
        display: false
      };
    case EVENTS:
      return { ...state, events };
    case ATTENDING:
      return { ...state, people };
    default:
      return state;
  }
}
