import csrfetch from './csrf';

const LOCALE = 'session/LOCALE';

const updateLocale = locale => ({ type: LOCALE, locale });

export const GetLocale = () => async dispatch => {
  const { data: { lng, lat } } = await csrfetch('/api/users/me/locale');
  dispatch(updateLocale({ lng, lat }));
};

export const SetLocale = locale => async dispatch => {
  const res = await csrfetch('/api/users/me/locale', {
    method: 'POST',
    body: JSON.stringify({ locale })
  });
  if (res.data?.success) dispatch(updateLocale(locale));
};

export default function reducer (state = { locale: { lat: null, lng: null } }, { type, locale }) {
  switch (type) {
    default:
      return state;
  }
}
