import csrfetch from './csrf';

const LOCALE = 'user/LOCALE';

const updateLocale = locale => ({ type: LOCALE, locale });

export const JoinEvent = eventId => async dispatch => {
  const { data } = await csrfetch(`/api/events/${eventId}/attendees`, {
    method: 'POST'
  });
  if (!data.success) {
    throw new Error(
      'Sorry, something went wrong. Please refresh the page and try again.'
    );
  }
};

export const LeaveEvent = eventId => async dispatch => {
  const { data } = await csrfetch(`/api/events/${eventId}/attendees/me`, {
    method: 'DELETE'
  });
  if (!data.success) {
    throw new Error(
      'Sorry, something went wrong. Please refresh the page and try again.'
    );
  }
};

export const GetLocale = () => async dispatch => {
  const { data: { lng, lat } } = await csrfetch('/api/users/me/locale');
  dispatch(updateLocale({ lng, lat }));
  return { lng, lat };
};

export const SetLocale = locale => async dispatch => {
  const { data } = await csrfetch('/api/users/me/locale', {
    method: 'POST',
    body: JSON.stringify({ locale })
  });
  if (data.success) dispatch(updateLocale(locale));
  return locale;
};

export const UpdateSearchSettings = pins => async () => {
  const { data } = await csrfetch('/api/users/me/settings', {
    method: 'POST',
    body: JSON.stringify({ pins })
  });
  return data;
};

export const SetProfilePhoto = image => async () => {
  // eslint-disable-next-line
  const body = new FormData();
  body.append('image', image);
  const { data } = await csrfetch('/api/users/me/profilePhoto', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body
  });
  return data;
};

export default function reducer (state = { locale: { lat: null, lng: null } }, { type, locale }) {
  switch (type) {
    case LOCALE:
      return { ...state, locale };
    default:
      return state;
  }
}
