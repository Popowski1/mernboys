const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { resolvers, typeDefs } = require ('./schemas');

const PORT = process.env.PORT || 3001;

const app = express();


const startApolloServer = async() => { const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware,});
 await server.start();
                                                            server.applyMiddleware({ app });
                                                          }


startApolloServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});