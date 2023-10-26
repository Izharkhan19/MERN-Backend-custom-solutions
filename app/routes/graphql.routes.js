// const express = require("express");
// const app = express();
// const { ApolloServer, gql } = require("apollo-server");

// const typeDefs = gql`
//   type Book {
//     id: ID
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }
// `;

// const resolvers = {
//   Query: {
//     books: () => [
//       { id: "1", title: "Book 1", author: "Author 1" },
//       { id: "2", title: "Book 2", author: "Author 2" },
//     ],
//   },
// };

// new ApolloServer({ typeDefs, resolvers });

// app.get("/graphqldata", new ApolloServer({ typeDefs, resolvers }));

// module.exports = app;
