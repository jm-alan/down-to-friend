import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Enumerate } from '../../store/reel';

export default function EventReel () {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.reel);

  const [loaded, load] = useState(false);

  useEffect(() => {
    dispatch(Enumerate())
      .then(load(true));
  }, [dispatch]);

  return loaded
    ? list
        ? <h1>There's definitely something here</h1>
        : <h1>Sorry, there don't seem to be any listings in this area.</h1>
    : null;
}
