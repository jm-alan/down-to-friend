import { createContext, useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

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

  return modalNode
    ? ReactDOM.createPortal(
      <div id='modal'>
        <div id='modal-background' onClick={onClose} />
        <div id='modal-content'>
          {children}
        </div>
      </div>,
      modalNode
      )
    : null;
}
