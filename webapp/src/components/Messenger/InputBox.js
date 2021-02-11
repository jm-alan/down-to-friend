import { useState } from 'react';
import { useSelector } from 'react-redux';

import Debouncer from '../../utils/Debouncer';

const typingEmit = (socket, setBegunTyping, user, conversation) => {
  setBegunTyping(false);
  socket.emit('isNotTyping', user, conversation);
};

const debouncedTyping = Debouncer(typingEmit, 500);

export default function InputBox () {
  const socket = useSelector(state => state.messenger.socket);
  const conversation = useSelector(state => state.messenger.conversation);
  const user = useSelector(state => state.session.user);

  const [message, updateMessage] = useState('');
  const [hasBegunTyping, setBegunTyping] = useState(false);

  const typingController = (value, updateMessage, hasBegunTyping, setBegunTyping) => {
    updateMessage(value);
    if (!hasBegunTyping) {
      setBegunTyping(true);
      socket.emit('isTyping', user, conversation);
    }
    debouncedTyping(socket, setBegunTyping, user, conversation);
  };

  const typingForwarder = ({ target: { value } }) => {
    typingController(
      value,
      updateMessage,
      hasBegunTyping,
      setBegunTyping
    );
  };

  const onSend = (e) => {
    e.preventDefault();
    if (conversation && message.length) {
      socket.emit('message', conversation, message);
      updateMessage('');
    }
  };

  return (
    <div className='typebox-container'>
      <form
        className='typebox-form'
        onSubmit={onSend}
      >
        <input
          className='typebox-input'
          value={message}
          onChange={typingForwarder}
        />
        <button
          type='submit'
          className='typebox-submit'
        >
          Send
        </button>
      </form>
    </div>
  );
}
