export const postReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [ action.payload,...state.posts],
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case "CLEAR_POSTS":
      return {
        ...state,
        posts: [],
      };
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case "ADD_REACTION":
      return {
        ...state,
        post: {
          ...state.post,
          likes: state.post.isLiked
            ? state.post.likes - 1
            : state.post.likes + 1,
          isLiked: !state.post.isLiked,
        },
      };
    default:
      return state;
  }
};
