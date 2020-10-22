const { ApolloServer, gql } = require("apollo-server");
const { create } = require("lodash");
const _ = require("lodash");

// our schema defines queries that clients can execute against the data graph.
//The query type defines three queries the client can executer.
const typeDefs = gql`
  type Query {
    users(role: String, permissions: Boolean): [User]
    hello: String
  }
  type User {
    name: String!
    role: [Role]!
    createdAt: String
    permissions: GetPermission
  }

  type GetPermission {
    createCustomer: Boolean
  }

  enum Role {
    ADMIN
    BROKER
    ADVISOR
  }
`;

const ADMIN = "ADMIN";
const BROKER = "BROKER";
const ADVISOR = "ADVISOR";

const USERS = [
  {
    name: "Peter Falkirk",
    role: [ADMIN],
    createdAt: "Fri Jan 18 2019 13:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {
      createCustomer: true,
    },
  },
  {
    name: "Mary Gardy",
    role: [ADVISOR, BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {
      createCustomer: true,
    },
  },
  {
    name: "Tomas Hilter",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {},
  },
  {
    name: "Superhands Fredrick",
    role: [ADVISOR],
    createdAt: "",
    permissions: {},
  },
  {
    name: "Peter Stifler",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {},
  },
  {
    name: "Anne Welder",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {},
  },
  {
    name: "",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {},
  },
  {
    name: "Mourinho",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {
      createCustomer: true,
    },
  },
  {
    name: "Peteris Best",
    role: [BROKER],
    createdAt: "Fri Jan 18 2018 09:10:20 GMT+0000 (Greenwich Mean Time)",
    permissions: {},
  },
];

const filterUsersByPermissions = (users, createCustomer) => {
  return users.filter(
    (user) => user.permissions.createCustomer === createCustomer
  );
};

const filterUsersByRole = (users, role) => {
  return _.filter(users, (user) => {
    return _.find(user.role, (userRole) => {
      return userRole === role;
    });
  });
};

const resolvers = {
  Query: {
    users: async (root, { role, permissions }) => {
      if (permissions) {
        return filterUsersByPermissions(USERS, permissions);
      } else if (role) {
        return filterUsersByRole(USERS, role);
      } else {
        return USERS;
      }
    },
    hello: () => "Hello World",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

module.exports = typeDefs;
