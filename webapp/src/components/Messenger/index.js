import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Conversations from './Conversations';
import ChatBox from './ChatBox';
import { LoadMessenger, UnloadMessenger } from '../../store/messenger';

import './messenger.css';

export default function Messenger () {
  const dispatch = useDispatch();
  const { conversation } = useSelector(state => state.messenger);
  const { user, loaded } = useSelector(state => state.session);

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
                  <ChatBox
                    conversation={conversation}
                  />
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
