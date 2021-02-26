import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Debouncer from '../../utils/Debouncer';
import { SetLimit } from '../../store/reel';
import { ShowLast } from '../../store/homeSlider';
import { UpdateSearchSettings, SetLocale } from '../../store/user';

const pinSetter = (dispatch, setShowSaving1, pins) => {
  dispatch(SetLimit(pins));
  dispatch(UpdateSearchSettings(pins))
    .then(success => {
      success && setShowSaving1(false);
    });
};

const debouncedPinSetter = Debouncer(pinSetter, 250);

export default function SearchSettings () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const { lng, lat } = useSelector(state => state.map);

  const [maxPins, setMaxPins] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [showSaving1, setShowSaving1] = useState(false);
  const [showSaving2, setShowSaving2] = useState(false);

  const inputRef = useRef(null);

  const onChangeMaxPins = ({ target: { value } }) => {
    value = `${value}`;
    setShowSaving1(true);
    setShowSaving2(true);
    value.match(/^[0-9]+$/) && setMaxPins(+value);
    value || setMaxPins(1);
    debouncedPinSetter(dispatch, setShowSaving1, +value || 1);
    ((value > 199) && (
      setShowWarning(true) ?? true
    )) || setShowWarning(false);
  };

  const pinPlus = () => {
    onChangeMaxPins({ target: { value: +maxPins + 1 } });
  };

  const pinMinus = () => {
    onChangeMaxPins({ target: { value: +maxPins - 1 } });
  };

  useEffect(() => {
    user && dispatch(SetLimit(user.maxPins)) && setMaxPins(user.maxPins);
    user ?? (dispatch(SetLimit(25)) && setMaxPins(25));
  }, [dispatch, user]);

  useEffect(() => {
    showSaving2 && setTimeout(() => {
      setShowSaving2(false);
    }, 500);
  }, [showSaving2]);

  const setLocale = () => {
    setShowSaving1(true);
    setShowSaving2(true);
    dispatch(SetLocale({ lng, lat }))
      .then(() => {
        setShowSaving1(false);
      });
  };

  const closeSettings = () => {
    dispatch(ShowLast());
  };

  const inputBoundingRect = inputRef.current && inputRef.current.getBoundingClientRect();

  return (
    <div className='slider-form-container searchsettings'>
      <button
        className='slider-button close-settings'
        onClick={closeSettings}
      >
        <i className='fas fa-times' /> <span className='label close-settings'>Close</span>
      </button>
      <form className='slider-form search-preferences'>
        <div className='max-events-display-container'>
          <div className='input-container max-events'>
            <span className='pin-limit-label-wrapper'>
              Limit the number of pins displayed on the map
            </span>
            <div className='input-and-button-container'>
              <button
                type='button'
                className='plus'
                onClick={pinPlus}
              >
                <i className='fas fa-plus' />
              </button>
              <input
                type='text'
                value={maxPins}
                onChange={onChangeMaxPins}
                onBlur={() => setShowWarning(false)}
                min={1}
                ref={inputRef}
              />
              <button
                type='button'
                className='plus'
                onClick={pinMinus}
              >
                <i className='fas fa-minus' />
              </button>
            </div>
          </div>
        </div>
        <div className='set-locale-display-container'>
          <button
            className='set-locale-button'
            type='button'
            onClick={setLocale}
          >
            Set my default locale to the current map center
          </button>
        </div>
        {showSaving1 || showSaving2
          ? (
            <div
              className='saving-animation-container'
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/dual-ring-small.svg`}
                alt=''
              /> Saving...
            </div>
            )
          : null}
      </form>
      {showWarning
        ? (
          <div
            className='max-pins-warning-container'
            style={inputBoundingRect && {
              top: inputBoundingRect.top - 150,
              left: inputBoundingRect.left
            }}
          >
            <div className='max-pins-warning'>
              Setting this too high can impact map performance!
            </div>
          </div>
          )
        : null}
    </div>
  );
}
