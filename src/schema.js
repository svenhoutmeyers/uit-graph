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

  type Query {
    events: [Event]!
    event(id: String!): Event
  }

`;

module.exports = typeDefs;