import csrfetch from './csrfetch';

const SHOW = 'eventModal/SHOW';
const HIDE = 'eventModal/HIDE';
const EVENT = 'eventModal/EVENT';
const POSTS = 'eventModal/POSTS';
const POST = 'eventModal/POST';
const EDIT_POST = 'eventModal/EDIT_POST';
const DELETE_POST = 'eventModal/DELETE_POST';

const setPosts = posts => ({
  type: POSTS,
  posts
});

export const SetEvent = event => ({
  type: EVENT,
  event
});

export const ShowEventModal = () => ({
  type: SHOW
});

export const HideEventModal = () => ({
  type: HIDE
});

const createPost = post => ({
  type: POST,
  post
});

const editPost = post => ({
  type: EDIT_POST,
  post
});

const deletePost = postId => ({
  type: DELETE_POST,
  postId
});

const addPost = post => ({
  type: NEW_POST,
  post
});

export const GetComments = eventId => async dispatch => {
  const { posts } = await csrfetch.get(`/api/events/${eventId}/posts`);
  dispatch(setPosts(posts));
};

export const CreateComment = (eventId, newComment, after = () => {}) => async dispatch => {
  const { post } = await csrfetch.post(`/api/events/${eventId}/posts`, { eventId, ...newComment });
  dispatch(createPost(post));
  after();
};

export const DeleteComment = (eventId, postId) => async dispatch => {
  await csrfetch.delete(`/api/events/${eventId}/posts/${postId}`);
  dispatch(deletePost(postId));
};

export const EditComment = (eventId, postId, body, after = () => {}) => async dispatch => {
  const { post } = await csrfetch(`/api/events/${eventId}/posts/${postId}`, body);
  dispatch(editPost(post));
  after();
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { display: false, event: null, posts: {} },
  { type, event, postId, post, posts }) {
  switch (type) {
    case EVENT:
      return { ...state, event };
    case POSTS:
      return { ...state, posts };
    case POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case DELETE_POST:
      delete state.posts[postId];
      return {
        ...state,
        posts: {
          ...state.posts
        }
      };
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false, event: null, posts: {} };
    default:
      return state;
  }
}
