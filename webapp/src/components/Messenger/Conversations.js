import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConvoSummary from './ConvoSummary';
import NewChatModal from './NewChatModal';
import { LoadAllConvos } from '../../store/messenger';
import { ShowNewChat } from '../../store/newchat';

export default function Conversations () {
  const dispatch = useDispatch();
  const { conversations } = useSelector(state => state.messenger);
  const { newChat } = useSelector(state => state.newChat);

  const popNewChat = () => {
    dispatch(ShowNewChat());
  };

  useEffect(() => {
    dispatch(LoadAllConvos());
  }, [dispatch]);

  return (
    <div className='conversation-container-outer'>
      <div className='new-chat-container'>
        <button
          className='new-conversation'
          onClick={popNewChat}
        >
          <i className='fas fa-plus' /> New Chat
        </button>
        {newChat
          ? <NewChatModal />
          : null}
      </div>
      <div className='conversation-container-inner'>
        {conversations.map((convo, idx) => (
          <ConvoSummary
            key={idx}
            convo={convo}
          />
        ))}
      </div>
    </div>
  );
}
