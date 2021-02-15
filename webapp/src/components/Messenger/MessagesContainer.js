import { useEffect, useRef } from 'react';

import Message from './Message';

export default function MessagesContainer ({ rollingMessages }) {
  const messageContainer = useRef(null);

  useEffect(() => {
    if (messageContainer.current) {
      const scroll = messageContainer.current.scrollHeight - messageContainer.current.clientHeight;
      messageContainer.current.scrollTo(0, scroll);
    }
  });

  return (
    <div
      className='messages-container'
      ref={messageContainer}
    >
      {rollingMessages.map((msg, idx) => (
        <Message
          key={idx}
          msg={msg}
        />
      ))}
    </div>
  );
}
