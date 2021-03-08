import { useSelector } from 'react-redux';

import ConvoSummary from './ConvoSummary';

export default function ConversationInnerContainer () {
  const conversations = useSelector(state => state.messenger.conversations);

  return (
    <div className='conversation-container-inner'>
      {conversations.map(convo => (
        <ConvoSummary
          key={convo.id}
          convo={convo}
        />
      ))}
    </div>
  );
}
