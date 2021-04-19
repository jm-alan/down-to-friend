import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { HideModal } from '../../store/authModal';
import { LoadSession } from '../../store/session';
import { Modal } from '../../context/Modal';

export default function FormModal () {
  const dispatch = useDispatch();
  const form = useSelector(state => state.authModal.form);
  const user = useSelector(state => state.session.user);
  const after = useSelector(state => state.authModal.after);

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
