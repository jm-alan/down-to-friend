import SummaryBody from './SummaryBody';

export default function OnProfile ({ event }) {
  return (
    <div
      className='event-summary-container'
    >
      <SummaryBody
        event={event}
        profileClick={() => {}}
      />
    </div>
  );
}
