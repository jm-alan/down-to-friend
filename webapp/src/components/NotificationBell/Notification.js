import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import QuickReply from './QuickReply';
import { AddLock, RemoveLock } from '../../store/notifManager';

export default function Notification ({ notif, setExpandContainer }) {
  const dispatch = useDispatch();
  const notifLock = useSelector(state => state.notifManager.lock);

  const [showQuickReply, setShowQuickReply] = useState(false);
  const [expandMessage, setExpandMessage] = useState(false);

  return (
    <div
      key={notif.id}
      className='notif-container'
      onClick={({ target }) => {
        if (
          (
            target.className.match(/notif-container/) ||
            target.className.match(/notif-sender-container/) ||
            target.className.match(/notif-content-container/)
          ) && showQuickReply === false
        ) {
          dispatch(AddLock());
          setShowQuickReply(true);
        } else {
          dispatch(RemoveLock());
          setShowQuickReply(false);
        }
      }}
      onMouseEnter={() => {
        setExpandMessage(true);
        setExpandContainer(true);
      }}
      onMouseLeave={() => {
        !showQuickReply && setExpandMessage(false);
        !notifLock && setExpandContainer(false);
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
      <QuickReply
        notif={notif}
        showQuickReply={showQuickReply}
        setShowQuickReply={setShowQuickReply}
        setExpandMessage={setExpandMessage}
        setExpandContainer={setExpandContainer}
      />
    </div>
  );
}
