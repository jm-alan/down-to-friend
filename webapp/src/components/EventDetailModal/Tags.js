import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Tags () {
  const event = useSelector(state => state.eventModal.event);

  return event && (
    <div className='event-summary-tags-outer-container'>
      <div className='event-summary-tags-inner-container'>
        {event.tags.split(' ').sort((a, b) => b.length - a.length)
          .map(tag => (
            <div key={tag} className='tag-wrapper'>
              <Link to={`/events/tagged/${tag}`}>
                {tag}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
