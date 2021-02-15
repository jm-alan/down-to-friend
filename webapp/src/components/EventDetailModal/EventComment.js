import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import EditComment from './CommentEditor';
import CommentEditDelete from './CommentEditDelete';

export default function EventComment ({ comment }) {
  const user = useSelector(state => state.session.user);
  const [edit, setEdit] = useState(false);
  const outerRef = useRef(null);

  return comment.body
    ? (
      <div
        id={`comment-${comment.id}`}
        className='event-comment-container'
        ref={outerRef}
      >
        {edit
          ? (
            <EditComment
              comment={comment}
              setEdit={setEdit}
              hangHeight={outerRef.current.clientHeight}
            />
            )
          : (
            <>
              <div className='event-comment-user-container'>
                <div className='event-comment-username-container'>
                  {comment.Author.firstName}
                </div>
                <Link to={`/users/${comment.Author.id}`}>
                  <div className='avatar-container event-comment'>
                    {comment.Author.Avatar
                      ? <img src={comment.Author.Avatar.url} alt='' />
                      : <i className='fas fa-user' />}
                  </div>
                </Link>
              </div>
              <div className='event-comment-body-container'>
                <p>
                  {comment.body}
                </p>
                {user && user.id === comment.ownerId && (
                  <CommentEditDelete
                    setEdit={setEdit}
                    comment={comment}
                  />
                )}
              </div>
            </>
            )}
      </div>
      )
    : null;
}
