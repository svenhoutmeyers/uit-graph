const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  type Event {
    id: String,
    name: String,
    description: String,
    address: Address,
    calendarSummary: String,
  }

  type Address {
    addressCountry: String,
    addressLocality: String,
    postalCode: String,
    streetAddress: String,
  }

  type Review {
      title: String!
      average_rating: Float!
    }

  type User {
    email: String!
  }

  type Query {
    events: [Event]!
    event(id: String!): Event
    reviews: [Review!]!
    me: User
  }

  type Mutation {
    addReview(title: String!, average_rating: Float!): Review!
  }

`;

module.exports = typeDefs;