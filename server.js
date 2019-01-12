import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import cors from 'cors';

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    greet: String!
  }

  type Message {
    id: ID!
    text: String!
    userId: ID!
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
  },
  3: {
    id: '3',
    username: 'fid',
    greet: 'a cusser up every crack',
  }
}

let messages = {
  1: {
    id: '1',
    text: 'Hullooo Worlddd',
  },
  2: {
    id: '2',
    text: 'second msgg',
  },
  3: {
    id: '3',
    text: 'Thirdy message ',
  }
}

const resolvers = {
  Query: {
    users: () => Object.values(users),
    me: (p, a, {me}) => me,
    user: (parent, {id}) => users[id],
    messages: () => Object.values(messages),
    message: (p, {id}) => messages[id],
  },
  Message: {
    userId: (p, a, {id}) => id
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => console.log(`Apollo Server up and chained on 8000`))
