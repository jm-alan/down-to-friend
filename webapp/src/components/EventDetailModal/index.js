import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import JoinButton from '../EventSummary/JoinButton';
import ModalComments from './ModalComments';
import { GetComments, HideEventModal } from '../../store/eventModal';

import './eventModal.css';

export default function EventDetailModal () {
  const dispatch = useDispatch();
  const display = useSelector(state => state.eventModal.display);
  const event = useSelector(state => state.eventModal.event);

  const { maxGroup: totalSlots, AttendingUsers } = event || {};
  const [totalAttending, setTotalAttending] = useState(AttendingUsers.length);
  const [slotsRemaining, setSlotsRemaining] = useState(totalSlots - totalAttending);

  const onClose = ({ target: { className } }) => {
    if (className === 'event-modal-display-control-container') {
      dispatch(HideEventModal());
    }
  };

  useEffect(() => {
    dispatch(GetComments(event.id));
  }, [dispatch, event.id]);

  return display
    ? (
      <div
        className='event-modal-background-container'
        id='modal-background'
        onClick={onClose}
      >
        <div className='event-modal-display-control-container'>
          <div className='event-modal-content-container'>
            <div className='event-modal-title-container'>
              <JoinButton
                event={event}
                slotsRemaining={slotsRemaining}
                setSlotsRemaining={setSlotsRemaining}
                setTotalAttending={setTotalAttending}
              />
              <div className='event-title-subcontainer upper'>
                <img src={event.Host.Avatar.url} alt='profilePhoto' />
                <h1>
                  {`${
                  event.Host.firstName
                } has invited ${
                  event.maxGroup
                } people to go ${
                  event.title.toTitleCase()
                } on ${
                  (new Date(event.dateTime))
                    .toLocaleDateString({}, { dateStyle: 'short' })
                }`}
                </h1>
              </div>
              <div className='event-title-subcontainer lower'>
                <h4>
                  {`${
                    totalAttending
                  } ${
                    totalAttending === 1
                    ? 'person has'
                    : 'people have'
                  } joined (${
                    slotsRemaining
                  } spots remaining${
                    totalAttending < 3
                      ? `, ${3 - totalAttending} more need${
                          3 - totalAttending === 1 ? 's' : ''
                        } to be filled to avoid autocancel`
                      : ' '
                  }), and this event closes on ${
                    (new Date(event.closes)).toLocaleDateString({ dateStyle: 'short' })
                  }`}
                </h4>
              </div>
            </div>
            <div className='event-summary-body-container'>
              <p>
                {event.description}
              </p>
            </div>
            <div className='event-summary-footer-container'>
              <ModalComments />
              <div className='event-summary-tags-outer-container'>
                <div className='event-summary-tags-inner-container'>
                  {event.tags.split(' ').sort((a, b) => b.length - a.length)
                    .map((tag, idx) => (
                      <div key={idx} className='tag-wrapper'>
                        <Link to={`/events/tagged/${tag}`}>
                          {tag}
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    : null;
}
