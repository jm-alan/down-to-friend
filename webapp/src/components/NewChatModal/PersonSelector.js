import { useSelector } from 'react-redux';
export default function PersonSelector ({ event, selectPerson, selectedPerson }) {
  const people = useSelector(state => state.newChat.people);

  return (
    event
      ? (
        <select
          className='person-selector'
          value={(selectedPerson.match(/^\d+/) &&
              selectedPerson.match(/^\d+/)[0]) ??
              ''}
          onChange={({ target: { value } }) => {
            selectPerson(value);
          }}
          required
        >
          {!selectedPerson
            ? (
              <option value=''>
                Pick someone to chat with
              </option>
              )
            : null}
          {people.map((addingPerson, idx) => {
            return (
              <option
                key={idx}
                value={`${addingPerson.id}-${addingPerson.firstName}`}
              >
                {addingPerson.firstName}
              </option>
            );
          })}
        </select>
        )
      : null
  );
}
