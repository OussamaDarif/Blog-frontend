import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const GRAPHQL_URL = "http://localhost:8082/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const ACCESS_TOKEN_KEY = "accessToken";
export const AUTH_EMAIL = "email";
export const AUTH_FIRSTNAME = "firstname";
export const AUTH_LASTNAME = "lastname";

export const REGISTER_MUTATION = gql`
  mutation ($input: RegisterInput!) {
    registerData: register(registerInput: $input) {
      token
      firstname
      lastname
      email
    }
  }
`;

export const AUTHENTICATION_MUTATION = gql`
  mutation ($input: AuthInput!) {
    loginData: authenticate(authInput: $input) {
      token
      email
      firstname
      lastname
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logoutData: logout {
      message
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation ($input: PostInput!) {
    post: createPost(postInput: $input) {
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

export const POSTS_QUERY = gql`
  query {
    posts {
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
    }
  }
`;

export const POST_QUERY = gql`
  query ($id: String!) {
    post(id: $id) {
      id
      content
      title
      image
      createdAt
      author {
        id
        email
        firstname
        lastname
      }
      comments {
        content
        username
        createdAt
        id
      }
      tags
      likes
      isLiked
    }
  }
`;

export const COMMENT_MUTATION = gql`
  mutation ($input: CommentInput!) {
    comment(commentInput: $input) {
      content
      createdAt
      postId
      username
      userId
      id
    }
  }
`;

export const REACT_MUTATION = gql`
  mutation ($id: String!) {
    react(postId: $id)
  }
`;