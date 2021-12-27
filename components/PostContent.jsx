import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function PostContent({ post }) {
  const postDate = typeof post.createdAt === 'number' ? new Date(post?.createdAt) : post?.createdAt.toDate()

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        {/* uncomment to add username */}
        
        {/* Written by{' '}
        <Link href={`/${post?.username}/`}>
          <a className="text-info">@{post?.username}</a>
        </Link>{' '} */}
        posted on {postDate.toLocaleString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  )
}