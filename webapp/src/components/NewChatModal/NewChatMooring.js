import { useDispatch, useSelector } from 'react-redux';

import NewChatModal from './';
import { ShowNewChat } from '../../store/newchat';

export default function NewChatMooring () {
  const dispatch = useDispatch();
  const displayNewChat = useSelector(state => state.newChat.display);

  const popNewChat = () => {
    dispatch(ShowNewChat());
  };

  return (
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
  );
}
