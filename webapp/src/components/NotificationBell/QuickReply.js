import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetNotifications, ClearNotif, RemoveLock } from '../../store/notifManager';

export default function QuickReply ({ notif, showQuickReply, setShowQuickReply, setExpandMessage, setExpandContainer }) {
  const dispatch = useDispatch();
  const notifSocket = useSelector(state => state.notifManager.socket);
  const notifLock = useSelector(state => state.notifManager.lock);

  const [quickReply, updateQuickReply] = useState('');

  const reply = (e, notif) => {
    e.preventDefault();
    notifSocket.emit('quickReply', notif.conversationId, quickReply);
    updateQuickReply('');
    dispatch(ClearNotif(notif.conversationId))
      .then(() => {
        setShowQuickReply(false);
        setExpandMessage(false);
        dispatch(RemoveLock());
        dispatch(GetNotifications());
      })
      .then(() => {
        if (!notifLock) setExpandContainer(false);
      });
  };

  return showQuickReply
    ? (
      <form
        onClick={click => click.stopPropagation()}
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
      )
    : null;
}
