import { register, login } from "../controllers/userController";

export const resolvers = {
  Query: {
    getUser: (_, args, ctx) => {
      console.log(args);
      return null;
    }
  },

  Mutation: {
    register: async (_, { input }, ctx) => register(input),
    login: async (_, { input }, ctx) => login(input)
  }
};
