import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Conversations from './Conversations';
import ChatContainer from './ChatContainer';
import * as MessengerActions from '../../store/messenger';
import { LoadMessenger, UnloadMessenger } from '../../store/messenger';

import './messenger.css';

if (process.env.NODE_ENV !== 'production') {
  window.MessengerActions = MessengerActions;
}

export default function Messenger () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);
  const convoSockets = useSelector(state => state.messenger.convoSockets);

  useEffect(() => {
    dispatch(LoadMessenger());
    return () => {
      dispatch(UnloadMessenger());
    };
  }, [dispatch, convoSockets]);

  return loaded
    ? user
        ? (
          <div className='messaging-container default'>
            <Conversations />
            <div className='chat-box-container'>
              <ChatContainer />
            </div>
          </div>
          )
        : <Redirect to='/' />
    : <img src={`${process.env.PUBLIC_URL}/img/dual-ring-small.svg`} alt='Loading...' />;
}
