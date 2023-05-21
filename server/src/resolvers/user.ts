import { ResolverContext } from "../resolvers"
import { UserResolvers } from "../resolvers-types.generated"
import { favoriteTransform, tweetTransform } from "../transforms"

export const userTwitterResolver: UserResolvers<ResolverContext> = {
  stats(user, _, { db }) {
    return {
      followingCount: 123,
      followerCount: 456789,
      tweetCount: db.getUserTweets(user.id).length,
    }
  },

  favorites(user, _, { db }) {
    const favorites = db.getUserFavorites(user.id)

    return favorites.map(favorite => {
      return {
        ...favoriteTransform(favorite),
        user,
        tweet: tweetTransform(db.getTweetById(favorite.tweetId)),
      }
    })
  },
}
