import { createContext, useContext, useEffect, useReducer } from "react";
import { postReducer } from "./postReducer";
import { getAuthUser } from "../../graphql/utils";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const initialState = {
    posts:[],
    post: null
  };


  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
