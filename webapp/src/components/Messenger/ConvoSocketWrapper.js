import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import ConvoSummary from './ConvoSummary';
import { LoadConvo, SetSocket, RegisterSocket, UnsregisterSocket } from '../../store/messenger';

export default function ConvoSocketMount ({ convo }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [liveSocket, setLiveSocket] = useState(null);
  const [unread, setUnread] = useState(false);

  const remainingUsers = convo.ChattingUsers.filter(({ id }) => id !== user.id);

  useEffect(() => {
    console.log('render convo wrapper');
    const socket = io(undefined, {
      query: {
        type: 'chat',
        conversation: convo.id
      }
    });
    socket.on('message', () => {
      setUnread(true);
    });
    setLiveSocket(socket);
    dispatch(RegisterSocket(convo.id, socket));
    return () => {
      console.log('Unrender convo wrapper');
      socket.close();
      dispatch(UnsregisterSocket(convo.id));
    };
  }, [dispatch, convo.id]);

  const onSelectConvo = () => {
    setUnread(false);
    dispatch(LoadConvo(convo.id));
    dispatch(SetSocket(convo.id));
  };

  return (
    <ConvoSummary
      convo={convo}
      remainingUsers={remainingUsers}
      onSelectConvo={onSelectConvo}
      unread={unread}
      socket={liveSocket}
    />
  );
}
