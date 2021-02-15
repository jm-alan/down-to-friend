import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MessagesContainer from './MessagesContainer';
import InputBox from './InputBox';

export default function ChatContainer () {
  const socket = useSelector(state => state.messenger.socket);
  const messages = useSelector(state => state.messenger.messages);
  const [rollingMessages, updateRollingMessages] = useState(messages);

  useEffect(() => {
    socket.on('message', (content, user) => {
      updateRollingMessages(rolling => [...rolling, {
        Sender: user,
        content
      }]);
    });
  }, [socket]);

  return (
    <>
      <MessagesContainer
        rollingMessages={rollingMessages}
      />
      <InputBox
        updateRollingMessages={updateRollingMessages}
      />
    </>
  );
}
