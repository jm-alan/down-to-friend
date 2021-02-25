import { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';

import { LoadSession } from '../store/session';

import './Modal.css';

const ModalContext = createContext();

export function ModalProvider ({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal ({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  const user = useSelector(state => state.session.user);
  const after = useSelector(state => state.modal.after);

  useEffect(() => () => after && after(), [user, after]);

  return modalNode
    ? ReactDOM.createPortal(
      <div id='modal'>
        <div
          id='modal-background'
          onClick={onClose}
        />
        <div id='modal-content'>
          {children}
        </div>
      </div>,
      modalNode
      )
    : null;
}
