import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SignUp } from '../../store/session';
import { SetLocale } from '../../store/user';
import { HideModal, ModalForm, SignupPhase } from '../../store/modal';
import { Focus, LoadMap } from '../../store/map';
import { LoadReel } from '../../store/reel';

function SignupFormPage () {
  const dispatch = useDispatch();
  const { phase } = useSelector(state => state.modal);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(SignUp({ email, firstName, password }))
        .then(() => dispatch(SignupPhase(2)))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
          dispatch(SignupPhase(1));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const onLocAccept = geoObj => {
    const { coords: { longitude: lng, latitude: lat } } = geoObj;
    dispatch(SetLocale({ lng, lat }))
      .then(({ lng, lat }) => {
        dispatch(Focus(lng, lat, null, 10));
      })
      .then(() => {
        dispatch(HideModal());
      });
  };

  const onLocReject = () => {
    dispatch(Focus(-121.49428149672518, 38.57366700738277, null, 10));
    dispatch(HideModal());
  };

  const promptLocation = () => {
    window.navigator.geolocation.getCurrentPosition(onLocAccept, onLocReject);
  };

  const onSetupLater = () => {
    dispatch(LoadReel());
    dispatch(LoadMap());
    dispatch(HideModal());
  };

  const switchForm = () => {
    dispatch(ModalForm('login'));
  };

  return (
    <div
      className='signup-phases-container'
      style={{
        left: 360 - phase * 360
      }}
    >
      <div className='form-container signup1'>
        <h1>Get With It</h1>
        <form
          onSubmit={handleSubmit}
          className='signup-form modal'
        >
          <ul className='errors'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <input
            placeholder='first name'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder='confirm password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className='form-button-container'>
            <button
              type='submit'
              className='form-submit signup'
            >
              Next
              <i className='fas fa-chevron-right nextarrow' />
            </button>
            <button
              type='button'
              onClick={switchForm}
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
      <div
        className='form-container signup2'
      >
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
    </div>
  );
}

export default SignupFormPage;
