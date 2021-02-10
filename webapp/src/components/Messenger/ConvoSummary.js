import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { LoadConvo, SetSocket, UnsetSocket } from '../../store/messenger';

export default function ConvoSummary ({ convo }) {
  const dispatch = useDispatch();

  let socket;

  useEffect(() => {
    socket = io(undefined, {
      query: {
        conversation: convo.id
      }
    });
    return () => {
      socket.close();
      dispatch(UnsetSocket());
    };
  }, [convo.id]);

  const onSelectConvo = () => {
    dispatch(LoadConvo(convo.id));
    dispatch(SetSocket(socket));
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
