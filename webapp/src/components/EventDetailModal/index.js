import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JoinButton from '../EventSummary/JoinButton';
import ModalComments from './ModalComments';
import { HideEventModal } from '../../store/eventModal';

import './eventModal.css';
import Tags from './Tags';
import UpperTitleContainer from './UpperTitleContainer';
import LowerTitleContainer from './LowerTitleContainer';

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

  return event && (
    display
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
                <UpperTitleContainer />
                <LowerTitleContainer
                  slotsRemaining={slotsRemaining}
                  totalAttending={totalAttending}
                  event={event}
                />
              </div>
              <div className='event-summary-body-container'>
                <p>
                  {event.description}
                </p>
              </div>
              <div className='event-summary-footer-container'>
                <ModalComments />
                <Tags event={event} />
              </div>
            </div>
          </div>
        </div>
        )
      : null
  );
}
