import { useSelector } from 'react-redux';

export default function Message ({ msg }) {
  const user = useSelector(state => state.session.user);

  return (
    <div
      className={`chat-message ${
      user.id === msg.Sender.id
        ? 'sent'
        : 'received'
    }`}
    >
      <div className='chat-message-user-container'>
        <span className='message-sender'>
          {msg.Sender.firstName}
        </span>
      </div>
      <div className='chat-message-content-container'>
        <span className='message-content'>
          {msg.content}
        </span>
      </div>
    </div>
  );
}
