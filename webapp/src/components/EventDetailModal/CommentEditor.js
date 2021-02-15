import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EditComment } from '../../store/eventModal';

export default function CommentEditor ({ comment, setEdit, hangHeight }) {
  const dispatch = useDispatch();
  const event = useSelector(state => state.eventModal.event);

  const [newComment, updateNewComment] = useState(comment.body);

  const onSubmit = e => {
    e.preventDefault();
    if (newComment && newComment !== comment.body) {
      dispatch(EditComment(event.id, comment.id, newComment))
        .then(resp => {
          if (resp.success) {
            comment.body = newComment;
            setEdit(false);
          }
        });
    } else {
      setEdit(false);
    }
  };

  return (
    <form
      className='comment-edit'
      onSubmit={onSubmit}
    >
      <textarea
        style={{
          height: `${hangHeight}px`
        }}
        required
        type='text'
        className='comment-edit-input'
        value={newComment}
        onChange={({ target: { value } }) => updateNewComment(value)}
      />
      <button className='comment-edit-submit'>
        <i className='fas fa-check' />
      </button>
    </form>
  );
}
