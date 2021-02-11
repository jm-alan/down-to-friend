import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Conversations from './Conversations';
import ChatContainer from './ChatContainer';
import { LoadMessenger, UnloadMessenger } from '../../store/messenger';

import './messenger.css';

export default function Messenger () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);
  const conversation = useSelector(state => state.messenger.conversation);

  useEffect(() => {
    dispatch(LoadMessenger());
    return () => {
      dispatch(UnloadMessenger());
    };
  }, [dispatch]);

  return loaded
    ? user
        ? (
          <div
            className='messaging-container'
          >
            <Conversations />
            <div className='chat-box-container'>
              {conversation
                ? (
                  <ChatContainer />
                  )
                : null}
            </div>
          </div>
          )
        : <Redirect to='/' />
    : (
      <h1>
        Loading...
      </h1>
      );
}
