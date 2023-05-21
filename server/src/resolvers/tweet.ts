import { ResolverContext } from "../resolvers"
import { TweetResolvers } from "../resolvers-types.generated"

export const tweetTwitterResolver: TweetResolvers<ResolverContext> = {
  author(tweet, _, { dbUserCache, dbTweetCache }) {
    const dbTweet = dbTweetCache[tweet.id]
    if (!dbTweet)
      throw new Error("Attempted to find Tweet.author, but the tweet was not found in dbTweetCache")

    const dbUser = dbUserCache[dbTweet.userId]
    if (!dbUser)
      throw new Error(
        "Attempted to find Tweet.author, but the tweet's author (a User) was not found in dbUserCache"
      )

    return dbUser
  },

  stats(tweet, _, { dbTweetToFavoriteCountMap }) {
    return {
      commentCount: Math.floor(Math.random() * 100),
      retweetCount: 1,
      favoriteCount: dbTweetToFavoriteCountMap[tweet.id] || 0,
    }
  },
}
