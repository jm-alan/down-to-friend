import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EnumerateChatEvents, EnumerateChatPeople, CreateChat, HideNewChat } from '../../store/newchat';
import { LoadConvo } from '../../store/messenger';

export default function NewChatModal () {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [event, selectEvent] = useState(-1);
  const [person, selectPerson] = useState(-1);

  const { events, people } = useSelector(state => state.newChat);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(CreateChat(person))
      .then(convo => {
        dispatch(LoadConvo(convo.id));
      })
      .then(() => {
        dispatch(HideNewChat());
      });
  };

  const onSelectEvent = ({ target: { value } }) => {
    selectEvent(value);
    dispatch(EnumerateChatPeople(value));
  };

  const onClose = () => {
    dispatch(HideNewChat());
  };

  useEffect(() => {
    dispatch(EnumerateChatEvents());
  }, [dispatch]);

  return (
    <div id='modal'>
      <div
        id='modal-background'
        onClick={onClose}
      />
      <div id='modal-content'>
        <div className='form-container newchat'>
          <h1>Start a Conversation</h1>
          <form
            className='newchat-form modal'
            onSubmit={onSubmit}
          >
            <ul className='errors'>
              {errors.map((err, idx) => (
                <li key={idx}>
                  {err}
                </li>
              ))}
            </ul>
            <select
              className='event-selector'
              value={event}
              onChange={onSelectEvent}
            >
              {event === -1
                ? (
                  <option
                    value={-1}
                  >
                    Pick an event
                  </option>
                  )
                : null}
              {events.map((event, idx) => (
                <option
                  key={idx}
                  value={event.id}
                >
                  {`${event.title.toTitleCase()} with ${event.Host.firstName}`}
                </option>
              ))}
            </select>
            {event >= 0
              ? (
                <select
                  className='person-selector'
                  value={person}
                  onChange={({ target: { value } }) => selectPerson(value)}
                >
                  {person === -1
                    ? (
                      <option>
                        Pick someone to chat with
                      </option>
                      )
                    : null}
                  {people.map((person, idx) => (
                    <option
                      key={idx}
                      value={person.id}
                    >
                      {person.firstName}
                    </option>
                  ))}
                </select>
                )
              : null}
            <div className='form-button-container'>
              <button type='submit'>
                Go!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
