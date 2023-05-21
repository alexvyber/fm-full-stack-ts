import { ResolverContext } from "resolvers"
import { QueryResolvers } from "resolvers-types.generated"

export const Query: QueryResolvers<ResolverContext> = {
  currentUser: () => {
    return {
      id: "123111",
      name: "John Doe",
      handle: "johndoe",
      coverUrl: "",
      avatarUrl: "",
      createdAt: "",
      updatedAt: "",
    }
  },

  suggestions: (_, __, { db: ___ }) => {
    return [
      {
        name: "TypeScript Project",
        handle: "TypeScript",
        avatarUrl: "http://localhost:3000/static/ts-logo.png",
        reason: "Because you follow @MichaelLNorth",
        id: "1",
      },
      {
        name: "jQuery",
        handle: "jquery",
        avatarUrl: "http://localhost:3000/static/jquery-logo.jpeg",
        reason: "Because you follow @FrontendMasters",
        id: "2",
      },
    ]
  },
}
