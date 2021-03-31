import csrfetch from './csrf';

const LOAD = 'chat/LOAD';

const LOADALL = 'chat/LOADALL';

const LOADCONVO = 'chat/LOADCONVO';

const SOCKET = 'chat/SOCKET';

const UNLOAD = 'chat/UNLOAD';

const loadConvo = (conversation, messages) => ({ type: LOADCONVO, conversation, messages });

const loadAllConvos = conversations => ({ type: LOADALL, conversations });

export const LoadAllConvos = () => async dispatch => {
  const { data } = await csrfetch('/api/users/me/conversations');
  dispatch(loadAllConvos(data.conversations));
};

export const LoadConvo = convoId => async dispatch => {
  const { data } = await csrfetch(`/api/users/me/conversations/${convoId}/messages`);
  dispatch(loadConvo(convoId, data.messages));
};

export const LoadMessenger = () => ({ type: LOAD });

export const UnloadMessenger = () => ({ type: UNLOAD });

export const SetMessengerSocket = socket => ({ type: SOCKET, socket });

export default function reducer (
  // eslint-disable-next-line
  state = {
    conversations: [],
    conversation: 0,
    messages: [],
    loadedConversations: false,
    loadedMessages: false,
    socket: null
  },
  {
    type,
    conversation,
    conversations,
    messages,
    socket
  }
) {
  switch (type) {
    case LOADALL:
      return { ...state, conversations };
    case LOAD:
      return { ...state };
    case UNLOAD:
      return {
        ...state,
        loadedConversations: false,
        loadedMessages: false,
        socket: null,
        conversation: 0,
        convoSockets: {}
      };
    case LOADCONVO:
      return {
        ...state,
        conversation,
        messages,
        loadedConversations: true,
        loadedMessages: true
      };
    case SOCKET:
      return { ...state, socket };
    default:
      return state;
  }
}
