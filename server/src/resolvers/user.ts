import { ResolverContext } from "../resolvers"
import { UserResolvers } from "../resolvers-types.generated"

export const userTwitterResolver: UserResolvers<ResolverContext> = {
  stats(user, _, { db }) {
    return {
      followingCount: 123,
      followerCount: 456789,
      tweetCount: db.getUserTweets(user.id).length,
    }
  },
}
