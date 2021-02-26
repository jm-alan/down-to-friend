import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MessagesContainer from './MessagesContainer';
import InputBox from './InputBox';

export default function ChatContainer () {
  const conversation = useSelector(state => state.messenger.conversation);
  const socket = useSelector(state => state.messenger.socket);
  const messages = useSelector(state => state.messenger.messages);
  const [rollingMessages, updateRollingMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    updateRollingMessages(messages);
    conversation && socket && socket.on(`convo-${conversation}`, (content, user) => {
      updateRollingMessages(rolling => [...rolling, {
        Sender: user,
        content
      }]);
    });
    conversation && socket && socket.on('isTyping', () => {
      setShowTyping(true);
    });
    conversation && socket && socket.on('isNotTyping', () => {
      setShowTyping(false);
    });
    return () => {
      socket && socket.off(`convo-${conversation}`);
    };
  }, [socket, conversation, messages]);

  useEffect(() => {
    socket && socket.emit(`viewing-${conversation}`);
  }, [socket, conversation]);

  return conversation
    ? (
      <>
        <MessagesContainer
          rollingMessages={rollingMessages}
          showTyping={showTyping}
        />
        <InputBox
          updateRollingMessages={updateRollingMessages}
        />
      </>
      )
    : null;
}
