import CommentsContainer from './CommentsContainer';
import CommentBox from './CommentBox';

export default function ModalComments () {
  return (
    <div className='event-modal-comments-outer-container'>
      <CommentBox />
      <CommentsContainer />
    </div>
  );
}
