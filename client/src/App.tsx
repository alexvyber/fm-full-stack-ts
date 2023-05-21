import * as React from "react"
import { gql } from "@apollo/client"
import { isDefined } from "@full-stack-ts/shared"

import { useGetCurrentUserQuery } from "./generated/graphql"
import Header from "./Header"
import LeftSidebar from "./LeftSidebar"
import RightBar from "./RightBar"
import Timeline from "./Timeline"

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      handle
      coverUrl
      avatarUrl
      createdAt
      updatedAt
      stats {
        tweetCount
        followingCount
        followerCount
      }
      favorites {
        id
        tweet {
          id
        }
      }
    }

    suggestions {
      name
      handle
      avatarUrl
      reason
    }

    trends {
      __typename
      ... on TopicTrend {
        tweetCount
        topic
        quote {
          title
          imageUrl
          description
        }
      }
      ... on HashtagTrend {
        tweetCount
        hashtag
      }
    }
  }
`

const App = () => {
  const { data, loading, error } = useGetCurrentUserQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data.</p>

  const currentUser = data.currentUser
  const suggestions = data.suggestions || []

  const favorites = currentUser?.favorites?.map(f => f.tweet?.id).filter(isDefined) || []
  const filteredTrends = data.trends.filter(isDefined)

  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline currentUserId={currentUser.id} currentUserFavorites={favorites} />
        <RightBar trends={filteredTrends} suggestions={suggestions} />
      </div>
    </div>
  )
}
export default App
