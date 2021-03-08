import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { HideModal } from '../../store/modal';
import { LoadSession } from '../../store/session';
import { Modal } from '../../context/Modal';

export default function FormModal () {
  const dispatch = useDispatch();
  const form = useSelector(state => state.modal.form);
  const user = useSelector(state => state.session.user);
  const after = useSelector(state => state.modal.after);

  return (
    <Modal
      onClose={() => {
        dispatch(HideModal());
        dispatch(LoadSession());
        user && after && after();
      }}
    >
      {form === 'login' && <LoginForm />}
      {form === 'signup' && <SignupForm />}
    </Modal>
  );
}
