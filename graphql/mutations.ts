import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      isSuperAdmin
      permissions {
        title
        description
      }
      unReadMessages
      user {
        _id
        token
        tokenExpiry
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($record: CreateOneUserInput!) {
    createUser(record: $record) {
      token
      tokenExpiry
    }
  }
`;
