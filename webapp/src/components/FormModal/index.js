import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { SetCurrent, ShowModal } from '../../store/modal';

export default function LoginFormModal () {
  const dispatch = useDispatch();

  const loginClick = () => {
    dispatch(SetCurrent(LoginForm));
    dispatch(ShowModal());
  };

  const signupClick = () => {
    dispatch(SetCurrent(SignupForm));
    dispatch(ShowModal());
  };

  return (
    <>
      <div className='nav-button-container'>
        <button onClick={loginClick}>Log In</button>
      </div>
      <div className='nav-button-container'>
        <button onClick={signupClick}>Sign Up</button>
      </div>
    </>
  );
}
