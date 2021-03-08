import { useSelector } from 'react-redux';

export default function NotifCounter ({ bellRef }) {
  const notifs = useSelector(state => state.notifManager.notifications);

  return notifs.length
    ? (
      <div
        className='counter-bauble'
        style={{
          left: bellRef.current.getBoundingClientRect().x + 18,
          top: bellRef.current.getBoundingClientRect().y - 3
        }}
      >
        {notifs.length}
      </div>
      )
    : null;
}
