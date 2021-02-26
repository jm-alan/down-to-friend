import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { HideModal } from '../../store/modal';
import { LoadSession } from '../../store/session';
import { Modal } from '../../context/Modal';

export default function FormModal () {
  const dispatch = useDispatch();
  const form = useSelector(state => state.modal.form);

  return (
    <Modal
      onClose={() => {
        dispatch(HideModal());
        dispatch(LoadSession());
      }}
    >
      {form === 'login' && <LoginForm />}
      {form === 'signup' && <SignupForm />}
    </Modal>
  );
}
