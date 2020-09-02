import { gql } from "apollo-server";

export const typeDefs = gql(`
    type User {
        _id: ID
        name: String
        username: String
        email: String
        avatar: String
        site: String
        description: String
        password: String
        createAt: String
    }
    
    type Token {
        token: String
    }
    
    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }
    
    input LoginInput {
        email: String!
        password: String!
    }
    
    type Query {
        getUser: User
    }
    
    type Mutation {
        register(input: UserInput): User
        login(input: LoginInput): Token
    }
`);
