import { useDispatch } from 'react-redux';

import { SetLocale } from '../../store/user';
import { HideModal } from '../../store/modal';
import { Focus, LoadMap } from '../../store/map';
import { LoadReel } from '../../store/reel';
import { LoadSession } from '../../store/session';

export default function SignupPhaseThree () {
  const dispatch = useDispatch();

  const onLocAccept = geoObj => {
    const { coords: { longitude: lng, latitude: lat } } = geoObj;
    dispatch(SetLocale({ lng, lat }))
      .then(({ lng, lat }) => {
        dispatch(Focus(lng, lat, null, 10));
      })
      .then(() => {
        dispatch(HideModal());
        dispatch(LoadSession());
      });
  };

  const onLocReject = () => {
    dispatch(Focus(-98.5795, 39.8283, null, 6));
    dispatch(HideModal());
    dispatch(LoadSession());
  };

  const onSetupLater = () => {
    dispatch(LoadReel());
    dispatch(LoadMap());
    dispatch(HideModal());
    dispatch(LoadSession());
  };

  const promptLocation = () => {
    window.navigator.geolocation.getCurrentPosition(onLocAccept, onLocReject);
  };

  return (
    <div className='form-container signup3'>
      <h1>How would you like to set your default search area?</h1>
      <div className='form-button-container'>
        <button
          onClick={promptLocation}
        >
          Use my location
        </button>
        <button>
          Search on the map
        </button>
        <button
          onClick={onSetupLater}
        >
          I'll set it up later
        </button>
      </div>
    </div>
  );
}
