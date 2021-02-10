import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Message from './Message';
import Debouncer from '../../utils/Debouncer';
import { LoadConvo } from '../../store/messenger';

const typingEmit = (socket, setBegunTyping, user, conversation) => {
  setBegunTyping(false);
  socket.emit('isNotTyping', user, conversation);
};

const debouncedTyping = Debouncer(typingEmit, 500);

export default function ChatBox ({ conversation }) {
  const dispatch = useDispatch();
  const { messages, socket } = useSelector(state => state.messenger);
  const { user } = useSelector(state => state.session);

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
    if (conversation) {
      socket.emit('message', conversation, message);
      updateMessage('');
    }
  };

  useEffect(() => {
    socket.on(`conversation${conversation}`, () => {
      dispatch(LoadConvo(conversation));
    });
    return () => {
      socket.close();
    };
  }, [dispatch, user, conversation, messages, socket]);

  return (
    <>
      <div className='messages-container'>
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            msg={msg}
          />
        ))}
      </div>
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
    </>
  );
}
