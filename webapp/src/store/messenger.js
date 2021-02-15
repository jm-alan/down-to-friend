import csrfetch from './csrf';

const LOAD = 'chat/LOAD';

const LOADALL = 'chat/LOADALL';

const LOADCONVO = 'chat/LOADCONVO';

const SOCKET = 'chat/SOCKET';

const REGISTER = 'chat/REGISTER';

const UNREGISTER = 'chat/UNREGISTER';

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

export const RegisterSocket = (convoId, socket) => ({ type: REGISTER, convoId, socket });

export const UnsregisterSocket = convoId => ({ type: UNREGISTER, convoId });

export const LoadMessenger = () => ({ type: LOAD });

export const UnloadMessenger = () => ({ type: UNLOAD });

export const SetSocket = convoId => ({ type: SOCKET, convoId });

export default function reducer (
  state = {
    conversations: [],
    conversation: 0,
    messages: [],
    connected: false,
    loadedMessenger: false,
    loadedConversations: false,
    loadedMessages: false,
    convoSockets: {},
    socket: null
  },
  {
    type,
    conversation,
    conversations,
    messages,
    convoSockets,
    convoId,
    socket
  }
) {
  switch (type) {
    case LOADALL:
      return { ...state, socket: null, conversations };
    case LOAD:
      return { ...state, loadedMessenger: true };
    case UNLOAD:
      return {
        ...state,
        loadedMessenger: false,
        loadedConversations: false,
        loadedMessages: false,
        socket: null,
        conversation: 0
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
      return { ...state, socket: state.convoSockets[convoId] };
    case REGISTER:
      return { ...state, convoSockets: { ...convoSockets, [convoId]: socket } };
    case UNREGISTER:
      delete state.convoSockets[convoId];
      return state;
    default:
      return state;
  }
}
