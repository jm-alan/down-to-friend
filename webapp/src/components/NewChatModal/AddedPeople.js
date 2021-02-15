import AddedPerson from './AddedPerson';

export default function AddedPeople ({ people }) {
  const valToName = val => val.match(/(?<=-)[a-zA-Z-]+$/);

  return people.length
    ? (
      <div className='added-persons'>
        <div className='added-persons-title micro'>
          <h3>Making a new chat with:</h3>
        </div>
        <div className='added-persons-list'>
          {people.map(valToName).map((person, idx) => {
            const isLast = idx === people.length - 1;
            return (
              <AddedPerson
                key={idx}
                person={person}
                isLast={isLast}
                totalPeople={people.length}
              />
            );
          })}
        </div>
      </div>
      )
    : null;
}
