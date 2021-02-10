import csrfetch from './csrf';

const LOADALLCONVOS = 'chat/LOADALLCONVOS';

const LOADCONVO = 'chat/LOADCONVO';

const LOAD = 'chat/LOAD';

const UNLOAD = 'chat/UNLOAD';

const SOCKET = 'chat/SOCKET';

const loadConvo = (conversation, messages) => ({ type: LOADCONVO, conversation, messages });

const loadAllConvos = conversations => ({ type: LOADALLCONVOS, conversations });

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

export const SetSocket = socket => ({ type: SOCKET, socket });

export const UnsetSocket = () => ({ type: SOCKET, socket: null });

export default function reducer (
  state = {
    conversations: [],
    conversation: 0,
    messages: [],
    connected: false,
    loadedMessenger: false,
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
    case LOADALLCONVOS:
      return { ...state, conversations };
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
      return { ...state, socket };
    default:
      return state;
  }
}
