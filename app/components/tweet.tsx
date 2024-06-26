import { getTweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'

const TweetPage = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id)
    return tweet ? <div data-theme="light"><EmbeddedTweet tweet={tweet} /></div> : <TweetNotFound />
  } catch (error) {
    console.error(error)
    return <TweetNotFound error={error} />
  }
}

export default TweetPage
