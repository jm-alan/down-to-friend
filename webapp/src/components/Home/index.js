import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventReel from './EventReel';
import GoogleMap from '../Map';
import { Enumerate } from '../../store/reel';
import { Focus } from '../../store/map';

import './home.css';

export default function Home () {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.reel);

  const [loaded, load] = useState(false);

  useEffect(() => {
    dispatch(Focus(-86.272832, 39.7797003, 10));
    dispatch(Enumerate(-86.272832, 39.7797003))
      .then(load(true));
  }, [dispatch]);

  return loaded && list && (
    <div className='home-container'>
      <EventReel
        list={list}
      />
      <GoogleMap
        loaded={loaded}
        list={list}
      />
    </div>
  );
}
