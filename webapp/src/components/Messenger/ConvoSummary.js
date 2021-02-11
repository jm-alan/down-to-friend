import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { LoadConvo, SetSocket, UnsetSocket } from '../../store/messenger';

export default function ConvoSummary ({ convo }) {
  const dispatch = useDispatch();
  const [liveSocket, setLiveSocket] = useState(null);

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        conversation: convo.id
      }
    });
    socket.on(`conversation${convo.id}`, () => {
      dispatch(LoadConvo(convo.id));
    });
    setLiveSocket(socket);
    return () => {
      console.log('Cleanup; unmount and close');
      socket.close();
      dispatch(UnsetSocket());
    };
  }, [dispatch, convo.id]);

  const onSelectConvo = () => {
    dispatch(LoadConvo(convo.id));
    dispatch(SetSocket(liveSocket));
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
