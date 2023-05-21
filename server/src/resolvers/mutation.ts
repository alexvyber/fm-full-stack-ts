import { ResolverContext } from "."
import { MutationResolvers } from "../resolvers-types.generated"
import { favoriteTransform, tweetTransform } from "../transforms"

export const mutationTwitterResolver: MutationResolvers<ResolverContext> = {
  async createTweet(_parent, args, { dbTweetCache, db }) {
    const { body, userId } = args

    const dbTweet = await db.createTweet({
      message: body,
      userId,
    })

    const dbTweetMap = (dbTweetCache ||= {})

    dbTweetMap[dbTweet.id] = dbTweet

    return tweetTransform(dbTweet)
  },

  async createFavorite(_parent, args, { db }) {
    const { favorite } = args

    const fav = await db.createFavorite(favorite)

    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    }
  },

  async deleteFavorite(_parent, args, { db }) {
    const { favorite } = args

    const fav = await db.deleteFavorite(favorite)

    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    }
  },
}
