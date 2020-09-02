import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./gql/schema";
import { resolvers } from "./gql/resolver";
dotenv.config();

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  },
  (err, _) => {
    if (err) {
      console.log("Error en establecer la conexión a la base de datos");
    } else {
      console.log("Se ha establecido conexión a la base de datos");
      server();
    }
  }
);

const server = () => {
  const serverApolo = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });

  serverApolo.listen().then(({ url }) => {
    console.log(`server graphql operativo ${url}`);
  });
};
