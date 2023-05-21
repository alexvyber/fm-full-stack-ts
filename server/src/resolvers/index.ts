import { Resolvers } from "resolvers-types.generated"
import { Query } from "./query"
import type DB from "../db"

export type ResolverContext = {
  db: DB
}

export const resolvers: Resolvers<ResolverContext> = {
  Query,
}
