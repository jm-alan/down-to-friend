import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import Messenger from './components/Messenger';
import { RestoreUser } from './store/session';

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RestoreUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div className='router-wrapper'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/users/:userId'>
            <UserProfile />
          </Route>
          <Route exact path='/messages'>
            <Messenger />
          </Route>
        </Switch>
      </div>
    </>
  );
}
