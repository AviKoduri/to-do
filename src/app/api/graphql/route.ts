//@ts-ignore
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury from "@mercury-js/core";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import historyTracking from "@mercury-js/core/packages/historyTracking";
import resolvers from "./SearchResolver";
import typeDefs from "./schema";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

import "./models";
import "./profiles"
// import './hooks';


mercury.connect(process.env.DB_URL!);

mercury.package([historyTracking()]);
mercury.addGraphqlSchema(typeDefs, resolvers);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mercury.typeDefs,
    resolvers: mercury.resolvers,
  })
);

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => {
    const token = req.headers.get("authorization")
      ? req.headers.get("authorization").split(" ")[1]
      : null;
    let role = "USER";
    let id = "1";
    if (token) {
      //@ts-ignore
      const verify: JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      if (!(verify.exp! < Math.floor(Date.now() / 1000))) {
        role = verify.role;
        id = verify.id;
      }
    }
    return {
      ...req,
      user: {
        id,
        profile: role,
      },
    };
  },
});

//@ts-ignore
export const MercuryInstance = mercury;

export async function GET(request: any) {
  return handler(request);
}

export async function POST(request: any) {
  return handler(request);
}
