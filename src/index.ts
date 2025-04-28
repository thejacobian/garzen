import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user
    type User {
    id: Int
    email: String
    first_name: String
    last_name: String
    is_admin: Boolean
  }

  # The "users" query returns an array of zero or more Users (defined above).
  type Query {
    users: [User]
  }
`;

const users = [
    {
        id: 1,
        email: 'jake.s.shelton+test1@gmail.com',
        first_name: 'jake1',
        last_name: 'shelton',
        is_admin: true
    },
    {
        id: 2,
        author: 'jake.s.shelton+test2@gmail.com',
        first_name: 'jake2',
        last_name: 'shelton',
        is_admin: false
    },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "users" array above.
const resolvers = {
    Query: {
        users: () => users,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Graphql Garzen Server ready at: ${url}`);