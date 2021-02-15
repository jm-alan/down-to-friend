export default function AddedPerson ({person, isLast, totalPeople}) {
  return (
    <div
      className='person-added'
    >
      {`${
        isLast && totalPeople > 1
          ? ' and'
          : ''
      }${person}${
        isLast
          ? ''
          : totalPeople > 2
            ? ','
            : ''}`} <i className='fas fa-times remove-added-person' />
    </div>
  );
}
