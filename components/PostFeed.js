import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <div className="headup">
        <Link href={`/${post.username}/${post.slug}`} passHref>
          <h2>
            <a>{post.title}</a>
          </h2>
        </Link>
        <Link href={`/${post.username}`}>
          <a className="author">By #{post.username}</a>
        </Link>
      </div>
      <footer>
        <span>
          {wordCount} words | {minutesToRead} min read |
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <div className="admin-set">
          <Link href={`/admin/${post.slug}`} passHref>
            <button className="blue-button">Edit</button>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </div>
      )}
    </div>
  );
}
