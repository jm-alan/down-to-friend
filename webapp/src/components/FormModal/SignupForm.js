import { useSelector } from 'react-redux';

import SignupPhaseOne from './SignupPhaseOne';
import SignupPhaseTwo from './SignupPhaseTwo';
import SignupPhaseThree from './SignupPhaseThree';

export default function SignupFormPage () {
  const phase = useSelector(state => state.authModal.phase);

  return (
    <div
      className='signup-phases-container'
      style={{
        left: 360 - phase * 360
      }}
    >
      <SignupPhaseOne />
      <SignupPhaseTwo />
      <SignupPhaseThree />
    </div>
  );
}
