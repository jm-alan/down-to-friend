export default function LowerTitleContainer ({ totalAttending, slotsRemaining, event }) {
  return (
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
  );
}
