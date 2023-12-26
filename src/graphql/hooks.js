import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ACCESS_TOKEN_KEY,
  AUTHENTICATION_MUTATION,
  AUTH_EMAIL,
  AUTH_FIRSTNAME,
  AUTH_LASTNAME,
  CREATE_POST_MUTATION,
  GRAPHQL_URL,
  LOGOUT_MUTATION,
  POST_QUERY,
  REGISTER_MUTATION,
  client,
} from "./queries";
import { useAuthContext } from "../context/auth/authContext";

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

  const createPost = async ({ title, content, file }) => {
    const formData = new FormData();
    const query = `
    mutation {
        post: createPost(postInput: {title: "${title}", content: "${content}"}) {
          id
          content
          createdAt
          image
          title
          author {
            id
            firstname
            lastname
            email
          }
        }
      }
    `;
    formData.append("operations", JSON.stringify({ query }));
    formData.append("map", JSON.stringify({ file: ["variables.file"] }));
    formData.append("file", file);
    const response = await fetch(GRAPHQL_URL, {
      headers: { Authorization: `Bearer ${user?.token}` },
      body: formData,
      method: "POST",
    });
    const { post } = await response.json();
    client.writeQuery({
      query: POST_QUERY,
      data: { post },
      variables: {
        id: post?.id,
      },
    });
    toast.success("Post created");
    navigate("/home");
  };
  return { createPost };
}
