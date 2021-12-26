import UserProfile from '../../components/UserProfile'
import PostFeed from '../../components/PostFeed'
import { getUserWithUsername, postToJSON } from '../../lib/firebase'

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  )
}

export async function getServerSideProps({ query }) {

  const { username } = query
  const userDoc = await getUserWithUsername(username)

  //JSON serializable data
  let user = null
  let posts = null

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true
    }
  }
  
  if (userDoc) {
    user = userDoc.data()
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      
    posts = (await postsQuery.get()).docs.map(postToJSON)
  }

  return {
    props: { user, posts }
  }
}