import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { LoadConvo, SetSocket, UnsetSocket } from '../../store/messenger';

export default function ConvoSummary ({ convo }) {
  const dispatch = useDispatch();

  const socketRef = useRef(
    io(undefined, {
      query: {
        conversation: convo.id
      }
    })
  );

  useEffect(() => {
    return () => {
      socketRef.current.close();
      dispatch(UnsetSocket());
    };
  }, [convo.id]);

  const onSelectConvo = () => {
    dispatch(LoadConvo(convo.id));
    dispatch(SetSocket(socketRef.current));
  };

  return (
    <div
      className='convo-summary-container'
      onClick={onSelectConvo}
    >
      {convo.name ||
      convo.ChattingUsers.map(({ firstName }, idx) => (
        <span key={idx}>
          {firstName}
        </span>
      ))}
    </div>
  );
}
