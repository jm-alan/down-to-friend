import CommentsContainer from './CommentsContainer';
import CommentBox from './CommentBox';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetComments } from '../../store/eventModal';

export default function ModalComments ({ event }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetComments(event.id));
  }, [dispatch, event.id]);

  return (
    <div className='event-modal-comments-outer-container'>
      <CommentBox />
      <CommentsContainer />
    </div>
  );
}
