import { Server } from "http"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import * as express from "express"

import { GRAPHQL_SCHEMA_PATH } from "./constants"
import Db from "./db"
import { ResolverContext, resolvers } from "./resolvers"

const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
})

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer> {
  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers,
    }),

    context: (): ResolverContext => ({
      db,
      dbTweetCache: {},
      dbTweetToFavoriteCountMap: {},
      dbUserCache: {},
    }),

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  server.applyMiddleware({
    app,
    cors: {},
  })

  return server
}
