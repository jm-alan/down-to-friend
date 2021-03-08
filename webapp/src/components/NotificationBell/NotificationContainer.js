import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Notification from './Notification';

export default function NotificationContainer ({ bellRef }) {
  const notifs = useSelector(state => state.notifManager.notifications);
  const showNotifs = useSelector(state => state.notifManager.display);

  const [expandContainer, setExpandContainer] = useState(false);

  const containerRef = useRef(null);

  return showNotifs
    ? (
      <div
        className='notification-container'
        ref={containerRef}
        style={{
          left: bellRef.current.getBoundingClientRect().x - 85,
          minWidth: expandContainer ? 550 : 200,
          maxWidth: expandContainer ? 550 : 200
        }}
        onClick={click => {
          click.stopPropagation();
        }}
      >
        {notifs.length
          ? notifs.map((notif, idx) => (
            <Notification
              key={idx}
              notif={notif}
              setExpandContainer={setExpandContainer}
            />
            ))
          : <h1>No notifications</h1>}
      </div>
      )
    : null;
}
