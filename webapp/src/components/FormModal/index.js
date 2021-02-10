import { useDispatch, useSelector } from 'react-redux';

import WrappedModal from './WrappedModal';
import { ModalForm, ShowModal } from '../../store/modal';

export default function LoginFormModal () {
  const dispatch = useDispatch();
  const { display } = useSelector(state => state.modal);

  const loginClick = () => {
    dispatch(ModalForm('login'));
    dispatch(ShowModal());
  };

  const signupClick = () => {
    dispatch(ModalForm('signup'));
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
      {display && <WrappedModal />}
    </>
  );
}
