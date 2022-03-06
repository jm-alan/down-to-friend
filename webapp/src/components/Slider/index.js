import { useSelector } from 'react-redux';

import SearchSettings from './SearchSettings';
import EventReel from './EventReel';
import NewEvent from './NewEvent';

import './Slider.css';

export default function Slider () {
  const reelLoaded = useSelector(state => state.reel.loaded);
  const sliderMode = useSelector(state => state.homeSlider.mode);
  const event = useSelector(state => state.eventModal.event);

  return reelLoaded
    ? (
      <div className={`reel-newevent-view-controller${
        event ? ' enlarge' : ''
      }`}
      >
        <div
          className='reel-newevent-sliding-controller'
          style={{
            left: sliderMode === 'reel'
              ? '-40vw'
              : sliderMode === 'new'
                ? '-80vw'
                : sliderMode === 'settings'
                  ? '0vw'
                  : '-40vw'
          }}
        >
          <SearchSettings />
          <EventReel />
          <NewEvent />
        </div>
      </div>
      )
    : (
      <div className='loading-container'>
        <img
          className='loading-spinner'
          src={`${process.env.PUBLIC_URL}/img/dual-ring-small.svg`}
          alt='Loading...'
        />
      </div>
      );
}
