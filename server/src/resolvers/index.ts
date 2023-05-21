import { Resolvers } from "resolvers-types.generated"

import type DB from "../db"
import { DbTweet, DbUser } from "../db"
import { mutationTwitterResolver } from "./mutation"
import { Query } from "./query"
import { trendTwitterResolver } from "./trend"
import { tweetTwitterResolver } from "./tweet"
import { userTwitterResolver } from "./user"

export type ResolverContext = {
  db: DB
  dbTweetCache: Record<string, DbTweet>
  dbUserCache: Record<string, DbUser>
  dbTweetToFavoriteCountMap: Record<string, number>
}

export const resolvers: Resolvers<ResolverContext> = {
  Query,
  Mutation: mutationTwitterResolver,
  Tweet: tweetTwitterResolver,
  User: userTwitterResolver,
  Trend: trendTwitterResolver,
}
