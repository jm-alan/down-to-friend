import { useSelector } from 'react-redux';
export default function PersonSelector ({ event, selectPerson, selectedPerson }) {
  const people = useSelector(state => state.newChat.people);
  const peopleLoaded = useSelector(state => state.newChat.peopleLoaded);

  return (
    event
      ? peopleLoaded
          ? (
            <select
              className='person-selector'
              value={selectedPerson}
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
              {people.map(({firstName, id}) => {
                return (
                  <option
                    key={id}
                    value={`${id}-${firstName}`}
                  >
                    {firstName}
                  </option>
                );
              })}
            </select>
            )
          : <img src={`${process.env.PUBLIC_URL}/img/dual-ring-invert.svg`} alt='Loading...' />
      : null
  );
}
