import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteComment } from '../../store/eventModal';

export default function CommentEditDelete ({ comment, setEdit }) {
  const dispatch = useDispatch();
  const [deletePrompt, setDeletePrompt] = useState(false);
  const event = useSelector(state => state.eventModal.event);

  const onConfirm = () => {
    dispatch(DeleteComment(event.id, comment.id, setDeletePrompt));
  };

  return (
    <div className='edit-delete'>
      {deletePrompt
        ? (
          <div className='delete-confirm-container'>
            <span className='delete-prompt'>
              Sure?
            </span>
            <div className='delete-confirm-buttons'>
              <button
                className='event-comment-delete cancel'
                onClick={() => setDeletePrompt(false)}
              >
                <i className='fas fa-times' />
              </button>
              <button
                className='event-comment-delete confirm'
                onClick={onConfirm}
              >
                <i className='fas fa-trash-alt' />
              </button>
            </div>
          </div>
          )
        : (
          <>
            <button
              className='event-comment-edit'
              onClick={() => setEdit(true)}
            >
              <i className='fas fa-edit' />
            </button>
            <button
              className='event-comment-delete'
              onClick={() => setDeletePrompt(true)}
            >
              <i className='fas fa-trash-alt' />
            </button>
          </>
          )}
    </div>
  );
}
