import { useState } from 'react';
import { useDispatch } from 'react-redux';

import EventSelector from './EventSelector';
import PersonSelector from './PersonSelector';
import { LoadConvo, LoadAllConvos, SetSocket } from '../../store/messenger';
import { HideNewChat, CreateChat } from '../../store/newchat';

export default function NewChatForm ({ addPeople, addedPeople }) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [selectedPerson, selectPerson] = useState('');
  const [event, selectEvent] = useState('');
  const [uniquePeople, trackUniquePeople] = useState(new Set());

  const valToNum = val => +val.match(/^\d+/);

  const onSubmit = e => {
    e.preventDefault();
    setErrors([]);
    dispatch(CreateChat(addedPeople.map(valToNum)))
      .then(convo => {
        dispatch(LoadAllConvos());
        return convo;
      })
      .then(convo => {
        dispatch(SetSocket(convo.id));
        return convo;
      })
      .then(convo => {
        if (convo) {
          dispatch(LoadConvo(convo.id));
        }
      })
      .then(() => {
        dispatch(HideNewChat());
      });
  };

  const addPerson = () => {
    uniquePeople.has(selectedPerson) ||
    (
      trackUniquePeople(people => people.add(selectedPerson)) ??
      addPeople(addedPeople => [...addedPeople, selectedPerson])
    );
  };

  return (
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
      <EventSelector
        event={event}
        selectEvent={selectEvent}
      />
      <PersonSelector
        event={event}
        selectPerson={selectPerson}
        selectedPerson={selectedPerson}
      />
      <div className='form-button-container'>
        {selectedPerson && (
          <button
            type='button'
            className='add-person'
            onClick={addPerson}
          >
            <i className='fas fa-plus' /> Add
          </button>
        )}
        {addedPeople.length
          ? (
            <button type='submit'>
              Go!
            </button>
            )
          : null}
      </div>
    </form>
  );
}
