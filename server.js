import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import cors from 'cors';

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    greet: String!
  }
`;

let users ={
  1: {
    id: '1',
    username: 'Dom Serra',
    greet: 'Its Dom the first',
  },
  2: {
    id: '2',
    username: 'Bolas',
    greet: 'Its Bolas tha second',
  }
}

const resolvers = {
  Query: {
    me: () => me,
    user: (parent, args) => {
      return {username: 'Bolas'}
    }
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => console.log(`Apollo Server up and chained on 8000`))
