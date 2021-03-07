import { useSelector } from 'react-redux';

export default function NotifCounter ({ bellRef }) {
  const notifs = useSelector(state => state.notifManager.notifications);

  return notifs.length
    ? (
      <div
      className='counter-bauble'
      
      >
        {notifs.length}
      </div>
      )
    : null;
}
