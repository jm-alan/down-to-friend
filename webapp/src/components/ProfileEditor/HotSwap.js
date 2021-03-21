import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { SetSession } from '../../store/session';

export default function HotSwap ({ placeholder, label, original, updater }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [content, updateContent] = useState(original);

  const inputRef = useRef(null);

  const swap = () => {
    setEdit(true);
    setTimeout(() => inputRef.current.focus());
  };

  const onChange = ({ target: { value } }) => {
    updateContent(value);
  };

  const onDone = submit => {
    submit.preventDefault();
    if (content !== original) {
      dispatch(updater(content))
        .then(user => {
          dispatch(SetSession(user, true, 'hot'));
          setEdit(false);
        });
    } else setEdit(false);
    setShowEditButton(false);
  };

  return edit
    ? (
      <form
        className='profile-editor hotswap'
        onSubmit={onDone}

      >
        <input
          placeholder={placeholder}
          ref={inputRef}
          className='hotswap-input'
          value={content}
          onChange={onChange}
          onBlur={onDone}
        />
      </form>
      )
    : (
      <div
        className='profile-editor hotswap'
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
      >
        <div className='hotswap-label-container'>
          {label}
        </div>
        <div className='hotswap-content-container'>
          {content}
        </div>
        {showEditButton
          ? (
            <i
              className='fas fa-edit hotswap-edit'
              onClick={swap}
            />
            )
          : null}
      </div>
      );
}
