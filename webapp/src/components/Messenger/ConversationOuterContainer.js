import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConversationInnerContainer from './ConversationInnerContainer';
import NewChatMooring from '../NewChatModal/NewChatMooring';
import { LoadAllConvos } from '../../store/messenger';

export default function ConversationOuterContainer () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAllConvos());
  }, [dispatch]);

  return (
    <div className='conversation-container-outer'>
      <NewChatMooring />
      <ConversationInnerContainer />
    </div>
  );
}
