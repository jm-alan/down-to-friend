import { useSelector } from 'react-redux';

import Message from './Message';

export default function MessagesContainer () {
  const messages = useSelector(state => state.messenger.messages);

  return (
    <div className='messages-container'>
      {messages.map((msg, idx) => (
        <Message
          key={idx}
          msg={msg}
        />
      ))}
    </div>
  );
}
