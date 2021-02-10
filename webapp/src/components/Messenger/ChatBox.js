import { useState, useEffect, useRef } from 'react';
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
  const socketRef = useRef(socket);

  const [message, updateMessage] = useState('');
  const [hasBegunTyping, setBegunTyping] = useState(false);

  const typingController = (value, updateMessage, hasBegunTyping, setBegunTyping) => {
    updateMessage(value);
    if (!hasBegunTyping) {
      setBegunTyping(true);
      socketRef.current.emit('isTyping', user, conversation);
    }
    debouncedTyping(socketRef.current, setBegunTyping, user, conversation);
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
      socketRef.current.emit('message', conversation, message);
      updateMessage('');
    }
  };

  useEffect(() => {
    socketRef.current.on(`conversation${conversation}`, () => {
      dispatch(LoadConvo(conversation));
    });
    return () => {
      socketRef.current.close();
    };
  }, [dispatch, user, conversation, messages, socketRef.current]);

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
