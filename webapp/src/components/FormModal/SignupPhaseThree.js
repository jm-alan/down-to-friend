import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Sleep from '../../utils/Sleep';
import FlashSearchbar from '../../utils/FlashSearchbar';
import { LoadReel } from '../../store/reel';
import { SetLocale } from '../../store/user';
import { HideModal } from '../../store/modal';
import { Focus, LoadMap } from '../../store/map';
import { LoadSession } from '../../store/session';
import { ShowSettings } from '../../store/homeSlider';

export default function SignupPhaseThree () {
  const dispatch = useDispatch();
  const after = useSelector(state => state.modal.after);

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
        after && after();
      });
  };

  const onLocReject = () => {
    setShowRejectMsg(true);
  };

  const promptLocation = () => {
    setShowRejectMsg(false);
    window.navigator.geolocation.getCurrentPosition(onLocAccept, onLocReject);
  };

  const onSearch = async () => {
    setShowRejectMsg(false);
    dispatch(LoadReel());
    dispatch(LoadMap());
    dispatch(HideModal());
    dispatch(LoadSession());
    dispatch(ShowSettings());
    await Sleep(650);
    FlashSearchbar();
  };

  const onSetupLater = () => {
    setShowRejectMsg(false);
    dispatch(LoadReel());
    dispatch(LoadMap());
    dispatch(HideModal());
    dispatch(LoadSession());
    after && after();
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
        <button onClick={onSearch}>
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
