import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import { RestoreUser } from './store/session';
import Navigation from './components/Navigation';

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RestoreUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
}
