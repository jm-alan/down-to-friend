import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { SetLocale } from '../../store/user';
import { HideModal } from '../../store/modal';
import { Focus, LoadMap } from '../../store/map';
import { LoadReel } from '../../store/reel';
import { LoadSession } from '../../store/session';

export default function SignupPhaseThree () {
  const dispatch = useDispatch();

  const [showRejectMsg, setShowRejectMsg] = useState(false);

  const onLocAccept = geoObj => {
    const { coords: { longitude: lng, latitude: lat } } = geoObj;
    dispatch(SetLocale({ lng, lat }))
      .then(({ lng, lat }) => {
        dispatch(Focus(lng, lat, null, 9));
      })
      .then(() => {
        dispatch(HideModal());
        dispatch(LoadSession());
      });
  };

  const onLocReject = () => {
    setShowRejectMsg(true);
  };

  const onSetupLater = () => {
    setShowRejectMsg(false);
    dispatch(LoadReel());
    dispatch(LoadMap());
    dispatch(HideModal());
    dispatch(LoadSession());
  };

  const promptLocation = () => {
    setShowRejectMsg(false);
    window.navigator.geolocation.getCurrentPosition(onLocAccept, onLocReject);
  };

  return (
    <div className='form-container signup3'>
      {showRejectMsg
        ? (
          <div className='reject-message-container'>
            <h4>
              We weren't able to get your location.
            </h4>
            <h4>
              Please check your browser secrity settings (change location to "ask" or "allow") and try again,
              or choose a different method.
            </h4>
          </div>
          )
        : <h1>How would you like to set your default search area?</h1>}
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
