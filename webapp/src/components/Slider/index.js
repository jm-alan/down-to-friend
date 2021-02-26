import { useSelector } from 'react-redux';

import SearchSettings from './SearchSettings';
import EventReel from './EventReel';
import NewEvent from './NewEvent';

import './Slider.css';

export default function Slider () {
  const list = useSelector(state => state.reel.list);
  const reelLoaded = useSelector(state => state.reel.loaded);
  const sliderMode = useSelector(state => state.homeSlider.mode);

  return reelLoaded
    ? (
      <div className='reel-newevent-view-controller'>
        <div
          className='reel-newevent-sliding-controller'
          style={{
            left: sliderMode === 'reel'
              ? '-768px'
              : sliderMode === 'new'
                ? '-1536px'
                : sliderMode === 'settings'
                  ? '0px'
                  : '-768px'
          }}
        >
          <SearchSettings />
          <EventReel
            list={list}
          />
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
