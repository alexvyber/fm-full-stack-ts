import { Resolvers } from "resolvers-types.generated"
import { Query } from "./query"
import type DB from "../db"
import { DbTweet, DbUser } from "../db"
import { userTwitterResolver } from "./user"
import { tweetTwitterResolver } from "./tweet"

export type ResolverContext = {
  db: DB
  dbTweetCache: Record<string, DbTweet>
  dbUserCache: Record<string, DbUser>
  dbTweetToFavoriteCountMap: Record<string, number>
}

export const resolvers: Resolvers<ResolverContext> = {
  Query,
  Tweet: tweetTwitterResolver,
  User: userTwitterResolver,
}
