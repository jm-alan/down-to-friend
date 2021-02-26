import csrfetch from './csrf';

const NOTIFS = 'notif/NOTIFS';

const CLEARALL = 'notif/CLEARALL';

const SOCKET = 'notif/SOCKET';

const mountNotifs = notifications => ({ type: NOTIFS, notifications });

export const SetNotifSocket = socket => ({ type: SOCKET, socket });

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
  state = { notifications: [], socket: null },
  { type, notifications, socket }
) {
  switch (type) {
    case NOTIFS:
      return { ...state, notifications };
    case CLEARALL:
      return { ...state, notifications: [] };
    case SOCKET:
      return { ...state, socket };
    default:
      return state;
  }
}
