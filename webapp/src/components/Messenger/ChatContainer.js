import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MessagesContainer from './MessagesContainer';
import InputBox from './InputBox';

export default function ChatContainer () {
  const conversation = useSelector(state => state.messenger.conversation);
  const socket = useSelector(state => state.messenger.socket);
  const messages = useSelector(state => state.messenger.messages);
  const [rollingMessages, updateRollingMessages] = useState([]);

  useEffect(() => {
    updateRollingMessages(messages);
    conversation && socket && socket.on(`convo-${conversation}`, (content, user) => {
      updateRollingMessages(rolling => [...rolling, {
        Sender: user,
        content
      }]);
    });
    return () => {
      socket.off(`convo-${conversation}`);
    };
  }, [socket, conversation, messages]);

  return conversation
    ? (
      <>
        <MessagesContainer
          rollingMessages={rollingMessages}
        />
        <InputBox
          updateRollingMessages={updateRollingMessages}
        />
      </>
      )
    : null;
}
