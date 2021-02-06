import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { ModalDisplay } from '../../store/modal';
import { Modal } from '../../context/Modal';

export default function FormModal () {
  const dispatch = useDispatch();
  const { form } = useSelector(state => state.modal);

  return (
    <Modal
      onClose={() => dispatch(ModalDisplay(false))}
    >
      {form === 'login' && <LoginForm />}
      {form === 'signup' && <SignupForm />}
    </Modal>
  );
}