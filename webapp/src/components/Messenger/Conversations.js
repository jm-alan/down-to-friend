import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConvoSummary from './ConvoSummary';
import NewChatModal from '../NewChatModal';
import { LoadAllConvos } from '../../store/messenger';
import { ShowNewChat } from '../../store/newchat';

export default function Conversations () {
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.messenger.conversations);
  const displayNewChat = useSelector(state => state.newChat.display);

  const popNewChat = () => {
    dispatch(ShowNewChat());
  };

  useEffect(() => {
    dispatch(LoadAllConvos());
  }, [dispatch]);

  return (
    <div className='conversation-container-outer'>
      <div className='new-chat-container'>
        <div className='new-chat-button-container'>
          <button
            className='new-conversation'
            onClick={popNewChat}
          >
            <i className='fas fa-plus' /> New Chat
          </button>
        </div>
        {displayNewChat
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
