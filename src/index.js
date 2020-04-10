const { ApolloServer, AuthenticationError } = require('apollo-server');

require('dotenv').config();


const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://publiq-sandbox.eu.auth0.com/.well-known/jwks.json'
});


function getKey(header, cb){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: 'http://localhost:4000/',
  issuer: `https://publiq-sandbox.eu.auth0.com/`,
  algorithms: ['RS256']
};

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://127.0.0.1:27017/graphqldb';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));


const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const EventAPI = require('./datasources/event');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if(err) {
          return reject(err);
        }
        resolve(decoded.email);
      });
    });
    return {
      user
    };
  },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
  dataSources: () => ({
    eventAPI: new EventAPI()
  })
});

/*

*/

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});