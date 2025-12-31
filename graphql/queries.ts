import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query TaskList {
    taskList {
      title
      is_active
      is_suspended
      xxx
      reminders
      suspended_reason
      type
      visible_from
      start_date
      end_date
      distance
      is_remote
      images
      status
      payment_terms_accepted
      description
      number_of_offers
      number_of_likes
      accepted_offer_id
      _id
      updatedAt
      createdAt
      time_left
      human_friendly_end_date
    }
  }
`;

export const GET_USER_TASKS_QUERY = gql`
  query GetUserTaskList($userId: ID) {
    getUserTasks(user_id: $userId) {
      title
      is_active
      is_suspended
      xxx
      reminders
      suspended_reason
      type
      visible_from
      start_date
      end_date
      distance
      is_remote
      images
      status
      payment_terms_accepted
      description
      number_of_offers
      number_of_likes
      accepted_offer_id
      _id
      updatedAt
      createdAt
      time_left
      human_friendly_end_date
    }
  }
`;

export const GET_TASK = gql`
  query TaskGet($filter: FilterFindOneTaskInput) {
    taskGet(filter: $filter) {
      title
      is_active
      is_suspended
      xxx
      reminders
      suspended_reason
      type
      visible_from
      start_date
      end_date
      distance
      is_remote
      images
      status
      payment_terms_accepted
      description
      number_of_offers
      number_of_likes
      accepted_offer_id
      _id
      updatedAt
      createdAt
      time_left
      human_friendly_end_date
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($filter: FilterFindOneUserInput) {
    getUser(filter: $filter) {
      _id
      email
      first_name
      last_name
    }
  }
`;
