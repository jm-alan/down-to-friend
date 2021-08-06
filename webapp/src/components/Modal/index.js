import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { TearDown } from '../../store/modal';
import { LoadSession } from '../../store/session';

import './Modal.css';

export default function Modal () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const { Current, after, display, mooring } = useSelector(state => state.modal);

  const onClose = () => {
    user && after && after();
    dispatch(TearDown());
    dispatch(LoadSession());
  };

  return Current && mooring && display && createPortal(
    <div
      id='modal-background'
      onClick={onClose}
    >
      <div
        id='modal-content'
        onClick={e => e.stopPropagation()}
      >
        <Current />
      </div>
    </div>,
    mooring
  );
}
