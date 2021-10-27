import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateComment } from '../../store/eventModal';

export default function CommentBox () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const event = useSelector(state => state.eventModal.event);

  const [comment, setComment] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    dispatch(CreateComment(event.id, comment, setComment));
  };

  return user && (
    <div className='comment-form-container'>
      <form
        className='new-comment'
        onSubmit={onSubmit}
      >
        <input
          placeholder='Leave a comment...'
          className='new-comment'
          type='text'
          value={comment}
          onChange={({ target: { value } }) => setComment(value)}
        />
        <button
          className='comment-submit'
          type='submit'
        >
          <i className='fas fa-chevron-circle-right' />
        </button>
      </form>
    </div>
  );
}
