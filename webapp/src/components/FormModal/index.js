import { useDispatch, useSelector } from 'react-redux';

import WrappedModal from './WrappedModal';
import { ModalForm, ModalDisplay } from '../../store/modal';

export default function LoginFormModal () {
  const dispatch = useDispatch();
  const { display } = useSelector(state => state.modal);

  const loginClick = () => {
    dispatch(ModalForm('login'));
    dispatch(ModalDisplay(true));
  };

  const signupClick = () => {
    dispatch(ModalForm('signup'));
    dispatch(ModalDisplay(true));
  };

  return (
    <>
      <div className='nav-button-container'>
        <button onClick={loginClick}>Log In</button>
      </div>
      <div className='nav-button-container'>
        <button onClick={signupClick}>Sign Up</button>
      </div>
      {display && <WrappedModal />}
    </>
  );
}
