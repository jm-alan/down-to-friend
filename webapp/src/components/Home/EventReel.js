import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Enumerate } from '../../store/reel';
import EventSummary from './EventSummary';

export default function EventReel () {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.reel);

  const [loaded, load] = useState(false);

  useEffect(() => {
    dispatch(Enumerate(-86.272832, 39.7797003))
      .then(load(true));
  }, [dispatch]);

  return loaded
    ? list
        ? (
            list.map((event, idx) => <EventSummary key={idx} event={event} />)
          )
        : <h1>Sorry, there don't seem to be any listings in this area.</h1>
    : <h1>Loading...</h1>;
}
