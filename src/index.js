const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const EventAPI = require('./datasources/event');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:uit-graph:eJQmwF2NIiRpqlGxJDJc8A",
  },
  dataSources: () => ({
    eventAPI: new EventAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});