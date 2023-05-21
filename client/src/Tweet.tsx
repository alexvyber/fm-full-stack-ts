import * as React from "react"
import { gql } from "@apollo/client"
import { faComment, faHeart as faHeartHollow } from "@fortawesome/free-regular-svg-icons"
import { faEllipsisH, faHeart as faHeartSolid, faRetweet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDistanceToNow } from "date-fns"

import { GET_CURRENT_USER } from "./App"
import { useCreateFavoriteMutation, useDeleteFavoriteMutation } from "./generated/graphql"
import { GET_TIMELINE_TWEETS } from "./Timeline"
import TweetMessage from "./TweetMessage"
import { humanFriendlyNumber } from "./utils/number"

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($favorite: FavoriteInput!) {
    createFavorite(favorite: $favorite) {
      id
    }
  }
`

export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($favorite: FavoriteInput!) {
    deleteFavorite(favorite: $favorite) {
      id
    }
  }
`

export interface TweetProps {
  currentUserId: string
  tweet: {
    id: string
    isFavorited: boolean
    message: string
    createdAt: Date
    author: {
      name: string
      handle: string
      avatarUrl: string
    }
    favoriteCount: number
    retweetCount: number
    commentCount: number
  }
}

const Tweet: React.FC<TweetProps> = ({ tweet, currentUserId }) => {
  const {
    message,
    createdAt,
    favoriteCount,
    retweetCount,
    commentCount,
    isFavorited,
    author: { name, handle, avatarUrl },
  } = tweet

  const [createFavorite, { error: createFavoriteError }] = useCreateFavoriteMutation({
    refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
  })

  const [deleteFavorite, { error: deleteFavoriteError }] = useDeleteFavoriteMutation({
    refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
  })

  if (createFavoriteError) return <p>Error creating favorite: {createFavoriteError.message}</p>

  if (deleteFavoriteError) return <p>Error deleting favorite: {deleteFavoriteError.message}</p>

  const handleFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()

    if (isFavorited) {
      deleteFavorite({
        variables: {
          favorite: {
            tweetId: tweet.id,
            userId: currentUserId,
          },
        },
      })
    } else {
      createFavorite({
        variables: {
          favorite: {
            tweetId: tweet.id,
            userId: currentUserId,
          },
        },
      })
    }
  }

  return (
    <div className="tweet">
      <div className="left">
        <img src={avatarUrl} />
      </div>
      <div className="right">
        <div className="info">
          <p>
            {name}
            <span>@{handle}</span>
          </p>
          <time>{formatDistanceToNow(createdAt)} ago</time>
        </div>
        <TweetMessage message={message} />
        <div className="btns">
          <button className="blue">
            <FontAwesomeIcon icon={faComment} /> {humanFriendlyNumber(commentCount)}
          </button>
          <button className="green">
            <FontAwesomeIcon icon={faRetweet} /> {humanFriendlyNumber(retweetCount)}
          </button>
          <button className="red" onClick={handleFavoriteClick}>
            <FontAwesomeIcon icon={isFavorited ? faHeartSolid : faHeartHollow} />{" "}
            {humanFriendlyNumber(favoriteCount)}
          </button>
          <button className="blue">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tweet
