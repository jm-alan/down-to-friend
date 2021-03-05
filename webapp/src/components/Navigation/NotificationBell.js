import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetNotifications, ClearNotif } from '../../store/notifManager';

export default function NotificationBell () {
  const dispatch = useDispatch();

  const notifs = useSelector(state => state.notifManager.notifications);
  const notifSocket = useSelector(state => state.notifManager.socket);

  const [showNotifs, setShowNotifs] = useState(false);
  const [expandMessage, setExpandMessage] = useState(false);
  const [showQuickReply, setShowQuickReply] = useState(false);
  const [quickReply, updateQuickReply] = useState('');

  const bellRef = useRef(null);
  const containerRef = useRef(null);

  const reply = (e, notif) => {
    e.preventDefault();
    notifSocket.emit('quickReply', notif.conversationId, quickReply);
    updateQuickReply('');
    dispatch(ClearNotif(notif.conversationId));
    dispatch(GetNotifications());
  };

  return (
    <>
      <button
        onClick={() => {
          setShowNotifs(show => !show);
          if (showQuickReply) setShowQuickReply(false);
        }}
        ref={bellRef}
      >
        <i className='fas fa-bell' />
      </button>
      {showNotifs
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
                    ) && setShowQuickReply(show => !show);
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
        : null}
    </>
  );
}
