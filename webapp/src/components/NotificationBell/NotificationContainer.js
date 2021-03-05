import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetNotifications, ClearNotif, QuickReply } from '../../store/notifManager';

export default function NotificationContainer ({ bellRef }) {
  const dispatch = useDispatch();
  const notifs = useSelector(state => state.notifManager.notifications);
  const showNotifs = useSelector(state => state.notifManager.display);
  const showQuickReply = useSelector(state => state.notifManager.quickReply);
  const notifSocket = useSelector(state => state.notifManager.socket);

  const [quickReply, updateQuickReply] = useState('');
  const [expandMessage, setExpandMessage] = useState(false);

  const containerRef = useRef(null);

  const reply = (e, notif) => {
    e.preventDefault();
    notifSocket.emit('quickReply', notif.conversationId, quickReply);
    updateQuickReply('');
    dispatch(ClearNotif(notif.conversationId))
      .then(() => {
        dispatch(GetNotifications());
      });
  };

  return showNotifs
    ? (
      <div
        className='notification-container'
        ref={containerRef}
        style={{
          left: bellRef.current.getBoundingClientRect().x - 85,
          minWidth: expandMessage ? 550 : 200,
          maxWidth: expandMessage ? 550 : 200
        }}
      >
        {notifs.length
          ? notifs.map(notif => (
            <div
              key={notif.id}
              className='notif-container'
              onClick={({ target }) => {
                (
                  target.className.match(/notif-container/) ||
                    target.className.match(/notif-sender-container/) ||
                    target.className.match(/notif-content-container/)
                ) && dispatch(QuickReply());
              }}
              onMouseEnter={() => setExpandMessage(true)}
              onMouseLeave={() => {
                if (!showQuickReply) {
                  setExpandMessage(false);
                }
              }}
              style={{
                height: expandMessage
                  ? showQuickReply ? 175 : 135
                  : 60
              }}
            >
              <div className='notif-sender-container'>
                {notif.sender}
              </div>
              <div
                className='notif-content-container'
                style={{
                  whiteSpace: expandMessage ? 'normal' : 'nowrap',
                  overflow: expandMessage ? 'auto' : 'hidden',
                  textOverflow: expandMessage ? 'unset' : 'ellipsis',
                  minHeight: expandMessage ? 100 : 'unset'
                }}
              >
                {notif.content}
              </div>
              <form
                className='quick-reply-container'
                style={{
                  bottom: showQuickReply ? 0 : -45
                }}
                onSubmit={(e) => reply(e, notif)}
              >
                <input
                  type='text'
                  placeholder='Reply...'
                  value={quickReply}
                  onChange={({ target: { value } }) => updateQuickReply(value)}
                />
                <button className='quick-reply-submit'>
                  <i className='fas fa-paper-plane' />
                </button>
              </form>
            </div>
            ))
          : <h1>No notifications</h1>}
      </div>
      )
    : null;
}
