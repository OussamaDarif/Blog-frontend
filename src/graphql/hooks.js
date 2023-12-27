import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { print as printGraphql } from "graphql";
import { gql } from "@apollo/client";

import {
  ACCESS_TOKEN_KEY,
  AUTHENTICATION_MUTATION,
  AUTH_EMAIL,
  AUTH_FIRSTNAME,
  AUTH_LASTNAME,
  COMMENT_MUTATION,
  CREATE_POST_MUTATION,
  GRAPHQL_URL,
  LOGOUT_MUTATION,
  POSTS_QUERY,
  POST_QUERY,
  REACT_MUTATION,
  REGISTER_MUTATION,
  client,
} from "./queries";
import { useAuthContext } from "../context/auth/authContext";
import { usePostContext } from "../context/post/postContext";

export function useRegister() {
  const [mutate, { loading, error }] = useMutation(REGISTER_MUTATION);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  return {
    register: async ({ email, firstname, lastname, password }) => {
      const {
        data: { registerData },
      } = await mutate({
        variables: { input: { email, password, firstname, lastname } },
        onError: () => {
          toast.error("Bad register infos");
        },
        onCompleted: ({
          registerData: { token, firstname, lastname, email },
        }) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
          localStorage.setItem(AUTH_EMAIL, email);
          localStorage.setItem(AUTH_FIRSTNAME, firstname);
          localStorage.setItem(AUTH_LASTNAME, lastname);
          dispatch({
            type: "SET_USER",
            payload: {
              email,
              firstname,
              lastname,
              token,
            },
          });
          toast.success("Successfully registered and logged in");
          navigate("/home");
        },
      });

      return registerData;
    },
    loading,
    error: Boolean(error),
  };
}

export function useLogin() {
  const [mutate, { loading, error }] = useMutation(AUTHENTICATION_MUTATION);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  return {
    login: async ({ email, password }) => {
      const {
        data: { loginData },
      } = await mutate({
        variables: { input: { email, password } },
        onError: () => {
          toast.error("Bad credentials");
        },
        onCompleted: ({ loginData: { token, email, firstname, lastname } }) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
          localStorage.setItem(AUTH_EMAIL, email);
          localStorage.setItem(AUTH_FIRSTNAME, firstname);
          localStorage.setItem(AUTH_LASTNAME, lastname);
          dispatch({
            type: "SET_USER",
            payload: {
              email,
              firstname,
              lastname,
              token,
            },
          });
          toast.success("Successfully logged in");
          navigate("/home");
        },
      });

      return loginData;
    },
    loading,
    error: Boolean(error),
  };
}

export function useLogout() {
  const [mutate, { loading, error }] = useMutation(LOGOUT_MUTATION);
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  return {
    logout: async () => {
      const {
        data: { logoutData },
      } = await mutate({
        context: {
          headers: { Authorization: "Bearer " + user?.token },
        },
        onError: () => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(AUTH_EMAIL);
          localStorage.removeItem(AUTH_FIRSTNAME);
          localStorage.removeItem(AUTH_LASTNAME);
          dispatch({
            type: "CLEAR_USER",
          });
          toast.success("logged out");
          navigate("/home");
        },
        onCompleted: () => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          localStorage.removeItem(AUTH_EMAIL);
          localStorage.removeItem(AUTH_FIRSTNAME);
          localStorage.removeItem(AUTH_LASTNAME);
          dispatch({
            type: "CLEAR_USER",
          });
          toast.success("logged out");
          navigate("/home");
        },
      });

      return logoutData;
    },
    loading,
    error: Boolean(error),
  };
}

export function useCreatePost() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = usePostContext();

  const createPost = async ({ title, content, file, tags }) => {
    const formData = new FormData();
    
    let variables = {
      input: {
        title,
        content,
        tags: tags.map((tag) => tag.text),
      },
    };
    const query = `
      mutation ($input: PostInput!) {
        post: createPost(postInput: $input) {
          author {
            id
            email
            firstname
            lastname
          }
          content
          title
          createdAt
          id
          image
          tags
          comments {
            content
            username
            createdAt
            id
          }
          likes
          isLiked
        }
      }`;
    formData.append("operations", JSON.stringify({
      query: query,
      variables: variables,
    }));

    formData.append(
      "map",
      JSON.stringify({
        file: ["variables.file"],
      })
    );
    formData.append("file", file);
    try {
      console.log([...formData.entries()]);
      const response = await fetch(GRAPHQL_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
        method: "POST",
      });
      const {
        data: { post },
      } = await response.json();

      dispatch({
        type: "ADD_POST",
        payload: post,
      });
      client.writeQuery({
        query: POST_QUERY,
        data: { post },
        variables: {
          id: post?.id,
        },
      });
      toast.success("Post created");
      navigate("/home");
    } catch (error) {
      toast.error("Something went wrong while creating the post !");
    }
  };
  return { createPost };
}

export function usePosts() {
  const { dispatch } = usePostContext();
  const { data, loading, error } = useQuery(POSTS_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ posts }) => {
      dispatch({
        type: "SET_POSTS",
        payload: posts,
      });
    },
  });
  return {
    posts: data?.posts,
    loading,
    error: Boolean(error),
  };
}

export function usePost(id) {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const headers = user?.token
    ? {
        Authorization: `Bearer ${user?.token}`,
      }
    : {};
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { id },
    context: {
      headers,
    },
    onCompleted: ({ post }) => {
      dispatch({
        type: "SET_POST",
        payload: post,
      });
    },
  });
  return {
    post: data?.post,
    loading,
    error: Boolean(error),
  };
}

export function useComment() {
  const [mutate, { loading, error }] = useMutation(COMMENT_MUTATION);
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  return {
    comment: async ({ postId, content }) => {
      const {
        data: { comment },
      } = await mutate({
        variables: { input: { content, postId } },
        context: {
          headers: { Authorization: "Bearer " + user?.token },
        },
        onError: (error) => {
          console.log(error);
          toast.error("Adding comment failed !");
        },
        onCompleted: ({ comment }) => {
          dispatch({
            type: "ADD_COMMENT",
            payload: comment,
          });
          toast.success("comment added");
        },
      });

      return comment;
    },
    loading,
    error: Boolean(error),
  };
}

export function useReact() {
  const [mutate, { loading, error }] = useMutation(REACT_MUTATION);
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  return {
    react: async ({ postId }) => {
      const {
        data: { react },
      } = await mutate({
        variables: { id: postId },
        context: {
          headers: { Authorization: "Bearer " + user?.token },
        },
        onError: () => {
          toast.error("react failed !");
        },
        onCompleted: () => {
          dispatch({
            type: "ADD_REACTION",
          });
        },
      });

      return react;
    },
    loading,
    error: Boolean(error),
  };
}
