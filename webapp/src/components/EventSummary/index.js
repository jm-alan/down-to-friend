import OnProfile from './OnProfile';
import OnHome from './OnHome';

import './summary.css';

export default function EventSummary ({ event, isProfile }) {
  return isProfile
    ? <OnProfile
        event={event}
      />
    : <OnHome
        event={event}
      />;
}
