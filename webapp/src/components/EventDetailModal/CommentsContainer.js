import { useSelector } from 'react-redux';

import EventComment from './EventComment';

export default function CommentContainer () {
  const posts = useSelector(state => state.eventModal.posts);

  return (
    <div className='event-modal-comments-container'>
      {posts.length
        ? Object.values(posts).map(post => (
          <EventComment
            key={post.id}
            comment={post}
          />
        ))
        : (
          <h3>
            No comments yet.
          </h3>
          )}
    </div>
  );
}
