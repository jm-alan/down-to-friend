import csrfetch from './csrf';

const NOTIFS = 'notif/NOTIFS';

const CLEARALL = 'notif/CLEARALL';

const SOCKET = 'notif/SOCKET';

const SHOW = 'notif/SHOW';

const HIDE = 'notif/HIDE';

const REPLY = 'notif/REPLY';

const mountNotifs = notifications => ({ type: NOTIFS, notifications });

export const SetNotifSocket = socket => ({ type: SOCKET, socket });

export const ShowNotifs = () => ({ type: SHOW });

export const HideNotifs = () => ({ type: HIDE });

export const QuickReply = () => ({ type: REPLY });

export const ClearNotif = conversationId => async () => {
  const { data } = await csrfetch(`/api/users/me/notifications/${conversationId}`, {
    method: 'DELETE'
  });
  return data;
};

export const GetNotifications = () => async dispatch => {
  const { data } = await csrfetch('/api/users/me/notifications');
  dispatch(mountNotifs(data.notifications));
  return data.notifications;
};

export default function reducer (
  state = { notifications: [], socket: null, display: false, reply: false },
  { type, notifications, socket }
) {
  switch (type) {
    case NOTIFS:
      return { ...state, notifications };
    case CLEARALL:
      return { ...state, notifications: [] };
    case SOCKET:
      return { ...state, socket };
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false, displayQuickReply: false };
    case REPLY:
      return { ...state, reply: !state.reply };
    default:
      return state;
  }
}
