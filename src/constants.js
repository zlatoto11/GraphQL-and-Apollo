export const GRAPHQL_API = "http://localhost:4000/graphql";

export const GET_ALL_USERS_QUERY = `
query ShowAllUsers{
	users{
    name
    role
    createdAt
    permissions{
      createCustomer
    }
  }
}
`;
export const FILTER_USERS_BY_ROLE = `
query FilterUsers($userRole:String!){
  users(role: $userRole){
    name
    role
    createdAt
    permissions{
      createCustomer
    }
  }
}
`;
export const FILTER_USERS_BY_PERMISSIONS = `
query ShowAllUsers($userPermissions: Boolean){
	users(permissions:$userPermissions){
    name
    role
    createdAt
    permissions{
      createCustomer
    }
  }
}
`;
