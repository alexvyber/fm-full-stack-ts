import * as React from "react"
import { gql } from "@apollo/client"
import { faChartBar, faComment, faFilm, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { GET_CURRENT_USER } from "./App"
import { useCreateNewTweetMutation } from "./generated/graphql"
import { GET_TIMELINE_TWEETS } from "./Timeline"

export const CREATE_NEW_TWEET = gql`
  mutation CreateNewTweet($userId: String!, $body: String!) {
    createTweet(userId: $userId, body: $body) {
      id
    }
  }
`

export interface ComposePanelProps {
  currentUser: { id: string }
}

const ComposePanel: React.FC<ComposePanelProps> = ({ currentUser }) => {
  const [createNewTweet, { error }] = useCreateNewTweetMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const textarea = event.currentTarget.querySelector("textarea")

    if (!textarea) throw new Error("No textarea found")

    await createNewTweet({
      variables: {
        body: textarea.value,
        userId: currentUser.id,
      },
      refetchQueries: [GET_TIMELINE_TWEETS, GET_CURRENT_USER],
    })

    textarea.value = ""
  }

  if (error) return <p>Error creating new tweet: {error.message}</p>

  return (
    <div className="new-tweet">
      <form onSubmit={handleSubmit}>
        <textarea name="body" placeholder="What's happening?"></textarea>
        <div className="btns">
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faFilm} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faChartBar} />
            </button>
          </div>
          <div className="btn">
            <button type="submit" className="blue">
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default ComposePanel
